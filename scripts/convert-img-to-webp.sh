#!/usr/bin/env bash

# This script recursively converts images (JPG, JPEG, PNG, HEIC) from INPUT_DIR to WebP format in OUTPUT_DIR.
# It preserves directory structure, sets quality, prints before/after sizes & compression stats for each file.

set -euo pipefail

INPUT_DIR="blog_input"
OUTPUT_DIR="blog_output"
QUALITY=82

mkdir -p "$OUTPUT_DIR"

find "$INPUT_DIR" -type f \( \
	-name "*.jpg" -o \
	-name "*.jpeg" -o \
	-name "*.png" -o \
	-name "*.heic" \
\) | while read -r file; do

	relative_path="${file#$INPUT_DIR/}"
	output_file="$OUTPUT_DIR/${relative_path%.*}.webp"

	mkdir -p "$(dirname "$output_file")"

	# original size (bytes)
	before_size=$(stat -f%z "$file")

	# convert
	cwebp -q "$QUALITY" "$file" -o "$output_file" >/dev/null 2>&1

	# new size (bytes)
	after_size=$(stat -f%z "$output_file")

	# convert to KB
	before_kb=$((before_size / 1024))
	after_kb=$((after_size / 1024))

	# compression %
	saved=$((100 - (after_size * 100 / before_size)))

	echo "converted: $file"
	echo "  before: ${before_kb} KB"
	echo "  after : ${after_kb} KB"
	echo "  saved : ${saved}%"
	echo
done