#!/usr/bin/env bash

set -euo pipefail

INPUT_DIR="blog_output"
OUTPUT_FILE="image-metadata.ts"

cat > "$OUTPUT_FILE" <<EOF
export const imageMetadata = [
EOF

find "$INPUT_DIR" -type f -name "*.webp" | sort | while read -r file; do
	relative_path="${file#$INPUT_DIR/}"

	width=$(sips -g pixelWidth "$file" | awk '/pixelWidth:/ { print $2 }')
	height=$(sips -g pixelHeight "$file" | awk '/pixelHeight:/ { print $2 }')

	cat >> "$OUTPUT_FILE" <<EOF
	{
		src: '${relative_path}',
		width: ${width},
		height: ${height},
	},
EOF
done

cat >> "$OUTPUT_FILE" <<EOF
] as const
EOF

echo "Generated $OUTPUT_FILE"