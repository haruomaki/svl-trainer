#!/usr/bin/env bash
set -euo pipefail

# フロントエンドをビルドして成果物をコピーする。
echo "■■■■■ クライアント ■■■■■"
cd client
npm install
npm run build
sudo rm -rf /var/www/svl-trainer
sudo cp -rv dist /var/www/svl-trainer

# デーモンの起動。/etc/systemd/system/svl-trainer.serviceを配置しておく。
echo ""
echo "■■■■■ サーバ ■■■■■"
sudo systemctl restart svl-trainer
sleep 1  # 再起動の結果が安定するまで待つ
systemctl status svl-trainer --no-pager

echo ""
echo "■■■■■ デプロイ完了！ ■■■■■"
echo "Server: https://api.haruomaki.jp/svl-trainer/"
echo "Client: https://haruomaki.jp/svl-trainer/"
