
# 此文件只是在百度的编译机群上有效
export PATH=$NODEJS_BIN_LATEST:$YARN_BIN_LATEST:$PATH
rm -rf output

echo "node: $(node -v)"
echo "npm: v$(npm -v)"

# 设置编译机群上的npm变量
npm config set registry http://registry.npm.baidu-int.com
npm config set puppeteer_skip_chromium_download true

# 如果NODE_ENV为production, npm5以上版本就不会安装devDependencies.
NODE_ENV=development npm install

# 为生产环境构建加NODE_ENV=production.
NODE_ENV=production npm run build

# output是编译机群的约定，必须是output，否则会导致产品库拉取的目录是空的。
# 详见：http://buildcloud.baidu.com/bcloud/10-bcloud_output
mkdir output

# 复制你的产出到output目录下
cp -rf dist/* output/ # 假设你的npm run build的产出目录是dist
