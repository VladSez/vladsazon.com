#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

SOURCE_DIR="blog_input"
WEBP_DIR="blog_output"
OUTPUT_FILE="image-metadata.ts"
GIT_PREFIX="$(git rev-parse --show-prefix)"

if [ ! -f "$OUTPUT_FILE" ]; then
	echo "Metadata file not found: $OUTPUT_FILE" >&2
	exit 1
fi

if ! grep -q '^] as const satisfies {$' "$OUTPUT_FILE"; then
	echo "Could not find the PHOTOS_METADATA closing declaration in $OUTPUT_FILE" >&2
	exit 1
fi

ADDITIONS_FILE="$(mktemp)"
UPDATED_FILE="$(mktemp)"
trap 'rm -f "$ADDITIONS_FILE" "$UPDATED_FILE"' EXIT

escape_ts_string() {
	local value="$1"
	value="${value//\\/\\\\}"
	value="${value//\"/\\\"}"
	printf '%s' "$value"
}

prompt_required() {
	local prompt="$1"
	local value=""

	while [ -z "$value" ]; do
		read -r -p "$prompt" value
	done

	printf '%s' "$value"
}

list_uncommitted_files() {
	# Staged or unstaged additions, copies, modifications, and renames.
	git diff --name-only --diff-filter=ACMR -z HEAD -- "$SOURCE_DIR"
	# Untracked files that are not ignored by Git.
	git ls-files --others --exclude-standard -z -- "$SOURCE_DIR"
}

added=0

# File names are read from descriptor 3 so prompts can continue to use stdin.
while IFS= read -r -d '' git_path <&3; do
	file="${git_path#"$GIT_PREFIX"}"

	case "$file" in
		"$SOURCE_DIR"/*.png|"$SOURCE_DIR"/*.jpg|"$SOURCE_DIR"/*.jpeg|"$SOURCE_DIR"/*.heic) ;;
		*) continue ;;
	esac

	source_relative_path="${file#$SOURCE_DIR/}"
	webp_relative_path="${source_relative_path%.*}.webp"
	webp_file="$WEBP_DIR/$webp_relative_path"

	if [ ! -f "$webp_file" ]; then
		echo "Missing converted image: $webp_file" >&2
		echo "Run convert-img-to-webp.sh before generating metadata." >&2
		exit 1
	fi

	if grep -Fq "/${webp_relative_path}" "$OUTPUT_FILE"; then
		continue
	fi

	width=$(sips -g pixelWidth "$webp_file" | awk '/pixelWidth:/ { print $2 }')
	height=$(sips -g pixelHeight "$webp_file" | awk '/pixelHeight:/ { print $2 }')

	echo "Adding metadata for $webp_relative_path"
	alt=$(prompt_required "  Alt text: ")
	location=$(prompt_required "  Location (City, Country): ")
	date=$(prompt_required "  Date (Month, Year): ")

	alt=$(escape_ts_string "$alt")
	location=$(escape_ts_string "$location")
	date=$(escape_ts_string "$date")

	cat >> "$ADDITIONS_FILE" <<EOF
  {
    src: \`\${BASE_URL}/${webp_relative_path}\`,
    width: ${width},
    height: ${height},
    alt: "${alt}",
    location: "${location}",
    date: "${date}",
  },
EOF

	added=$((added + 1))
done 3< <(list_uncommitted_files)

if [ "$added" -eq 0 ]; then
	echo "No new image metadata to add"
	exit 0
fi

awk -v additions="$ADDITIONS_FILE" '
  /^] as const satisfies \{$/ {
    while ((getline line < additions) > 0) print line
    close(additions)
  }
  { print }
' "$OUTPUT_FILE" > "$UPDATED_FILE"

mv "$UPDATED_FILE" "$OUTPUT_FILE"
echo "Appended metadata for $added image(s) to $OUTPUT_FILE"
