module.exports = {
  verbose: true,
  notify: true,
  bail: true, // 遇到第一个失败后就停止继续运行测试用例
  clearMocks: true,
  collectCoverage: true, // 是否收集测试时的覆盖率信息
  collectCoverageFrom: [ // 哪些文件覆盖率信息需要被收集
    "**/*.{js,jsx}",
    "!**/(service|node_modules|test/mocks)/**"
  ],
  testEnvironment: "node", // 将用于jest测试的测试环境
  moduleNameMapper: { // 添加alias别名设置
    "@/(.*)": [
      "<rootDir>/$1"
    ]
  },
  // roots: [ // 单测文件的位置（不添加默认从工程中扫描*test.js文件）
  //   "<rootDir>/test"
  // ],
  testPathIgnorePatterns: [ // 需要忽略的路径
    "tests/(fixtures|mocks)/",
    "node_modules"
  ],
  // coverageDirectory: "<rootDir>/test/coverage", // Jest输出覆盖信息文件的目录。
  coverageReporters: [ // 覆盖率总览
    "text",
    // "html", // 以HTML形式输出文件
    "text-summary"
  ] // 添加“text”或“text-summary”以在控制台输出中查看覆盖率摘要


};