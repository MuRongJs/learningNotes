function isfever(temperature) {
  return temperature >= 37 ? '发烧' : '正常';
}

module.exports = isfever;