const fs = require('fs');
const path = require('path');

// 配置
const CATEGORIES_DIR = path.join(__dirname, '..'); // 分类目录在根目录
const OUTPUT_FILE = path.join(__dirname, '../api/image-data.json');
const EXCLUDE_DIRS = ['.git', 'api', 'scripts', '.github']; // 排除的目录

// 获取所有分类目录
const getCategories = () => {
  return fs.readdirSync(CATEGORIES_DIR)
    .filter(item => {
      const itemPath = path.join(CATEGORIES_DIR, item);
      return fs.statSync(itemPath).isDirectory() && 
             !EXCLUDE_DIRS.includes(item) &&
             !item.startsWith('.');
    });
};

// 生成图片索引
const generateImageIndex = () => {
  const categories = getCategories();
  const imageData = {};
  
  categories.forEach(category => {
    const categoryPath = path.join(CATEGORIES_DIR, category);
    
    // 获取该分类下的所有图片文件
    const images = fs.readdirSync(categoryPath)
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
      })
      .map(file => `/${category}/${file}`);
    
    imageData[category] = images;
  });
  
  // 保存到 JSON 文件
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(imageData, null, 2));
  console.log(`✅ 图片索引已生成: ${OUTPUT_FILE}`);
};

// 执行生成
generateImageIndex();