const fs = require('fs');
const path = require('path');
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
} = require('docx');
const { marked } = require('marked');

// Cấu hình marked để parse markdown
marked.setOptions({
  breaks: true,
  gfm: true,
});

// Hàm parse markdown và tạo paragraphs
function parseMarkdownToDocx(markdown) {
  const tokens = marked.lexer(markdown);
  const children = [];

  for (const token of tokens) {
    switch (token.type) {
      case 'heading':
        const level = token.depth;
        const headingLevel =
          level === 1
            ? HeadingLevel.HEADING_1
            : level === 2
              ? HeadingLevel.HEADING_2
              : level === 3
                ? HeadingLevel.HEADING_3
                : level === 4
                  ? HeadingLevel.HEADING_4
                  : level === 5
                    ? HeadingLevel.HEADING_5
                    : HeadingLevel.HEADING_6;
        children.push(
          new Paragraph({
            text: token.text,
            heading: headingLevel,
            spacing: { after: 200 },
          }),
        );
        break;

      case 'paragraph':
        const runs = parseInlineElements(token.tokens || []);
        if (runs.length > 0) {
          children.push(
            new Paragraph({
              children: runs,
              spacing: { after: 120 },
            }),
          );
        }
        break;

      case 'list':
        if (token.ordered) {
          token.items.forEach((item, index) => {
            const itemRuns = parseInlineElements(item.tokens || []);
            children.push(
              new Paragraph({
                children: [
                  new TextRun({ text: `${index + 1}. `, bold: true }),
                  ...itemRuns,
                ],
                spacing: { after: 100 },
                indent: { left: 400 },
              }),
            );
          });
        } else {
          token.items.forEach((item) => {
            const itemRuns = parseInlineElements(item.tokens || []);
            children.push(
              new Paragraph({
                children: [
                  new TextRun({ text: '• ', bold: true }),
                  ...itemRuns,
                ],
                spacing: { after: 100 },
                indent: { left: 400 },
              }),
            );
          });
        }
        break;

      case 'code':
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: token.text,
                font: 'Courier New',
                size: 20,
              }),
            ],
            spacing: { after: 120 },
            shading: { fill: 'F5F5F5' },
          }),
        );
        break;

      case 'blockquote':
        const quoteRuns = parseInlineElements(token.tokens || []);
        children.push(
          new Paragraph({
            children: quoteRuns,
            spacing: { after: 120 },
            indent: { left: 400 },
            border: { left: { color: 'CCCCCC', size: 4 } },
          }),
        );
        break;

      case 'hr':
        children.push(
          new Paragraph({
            text: '────────────────────────────────────────',
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 200 },
          }),
        );
        break;

      case 'table':
        // Xử lý table đơn giản
        if (token.header && token.header.length > 0) {
          const headerRuns = token.header.map(
            (cell) => new TextRun({ text: cell.text || '', bold: true }),
          );
          children.push(
            new Paragraph({
              children: headerRuns,
              spacing: { after: 100 },
            }),
          );
        }
        if (token.rows) {
          token.rows.forEach((row) => {
            const rowRuns = row.map(
              (cell) => new TextRun({ text: cell.text || '' }),
            );
            children.push(
              new Paragraph({
                children: rowRuns,
                spacing: { after: 100 },
              }),
            );
          });
        }
        break;

      default:
        // Xử lý các loại token khác
        if (token.text) {
          children.push(
            new Paragraph({
              text: token.text,
              spacing: { after: 120 },
            }),
          );
        }
    }
  }

  return children;
}

// Hàm parse inline elements (bold, italic, code, links)
function parseInlineElements(tokens) {
  const runs = [];

  for (const token of tokens) {
    switch (token.type) {
      case 'text':
        runs.push(new TextRun({ text: token.text }));
        break;

      case 'strong':
        const strongRuns = parseInlineElements(token.tokens || []);
        strongRuns.forEach((run) => {
          if (run instanceof TextRun) {
            run.bold = true;
          }
        });
        runs.push(...strongRuns);
        break;

      case 'em':
        const emRuns = parseInlineElements(token.tokens || []);
        emRuns.forEach((run) => {
          if (run instanceof TextRun) {
            run.italics = true;
          }
        });
        runs.push(...emRuns);
        break;

      case 'codespan':
        runs.push(
          new TextRun({
            text: token.text,
            font: 'Courier New',
            size: 20,
          }),
        );
        break;

      case 'link':
        const linkRuns = parseInlineElements(token.tokens || []);
        runs.push(...linkRuns);
        break;

      case 'br':
        runs.push(new TextRun({ text: '\n', break: 1 }));
        break;

      default:
        if (token.text) {
          runs.push(new TextRun({ text: token.text }));
        }
    }
  }

  return runs;
}

// Hàm chuyển đổi file markdown sang docx
async function convertMarkdownToDocx(mdFilePath, outputPath) {
  try {
    console.log(`Đang đọc file: ${mdFilePath}`);
    const markdown = fs.readFileSync(mdFilePath, 'utf-8');

    console.log(`Đang parse markdown...`);
    const children = parseMarkdownToDocx(markdown);

    console.log(`Đang tạo document...`);
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: children,
        },
      ],
    });

    console.log(`Đang lưu file: ${outputPath}`);
    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(outputPath, buffer);

    console.log(`✅ Đã chuyển đổi thành công: ${outputPath}`);
  } catch (error) {
    console.error(`❌ Lỗi khi chuyển đổi ${mdFilePath}:`, error.message);
    throw error;
  }
}

// Hàm chuyển đổi tất cả file markdown trong thư mục
async function convertAllMarkdownFiles() {
  const files = [
    '00_MUC_LUC.md',
    '01_MO_DAU.md',
    '02_CHUONG_1_GIOI_THIEU.md',
    '03_CHUONG_2_CO_SO_LY_THUYET.md',
    '04_CHUONG_3_PHAN_TICH_THIET_KE.md',
    '05_CHUONG_4_TRIEN_KHAI.md',
    '06_CHUONG_5_KET_QUA_DANH_GIA.md',
    '07_KET_LUAN.md',
    '08_TAI_LIEU_THAM_KHAO.md',
    '09_PHU_LUC.md',
  ];

  console.log('Bắt đầu chuyển đổi các file markdown sang docx...\n');

  for (const file of files) {
    if (fs.existsSync(file)) {
      const outputFile = file.replace('.md', '.docx');
      await convertMarkdownToDocx(file, outputFile);
      console.log('');
    } else {
      console.log(`⚠️  File không tồn tại: ${file}`);
    }
  }

  console.log('Hoàn thành!');
}

// Chạy script
if (require.main === module) {
  convertAllMarkdownFiles().catch(console.error);
}

module.exports = { convertMarkdownToDocx };
