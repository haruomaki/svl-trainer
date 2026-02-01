#!/usr/bin/env bash
set -euo pipefail

# フロントエンドをビルドして成果物をコピーする。
echo "■■■■■ クライアント ■■■■■"
cd client
npm run build
sudo rm -rf /var/www/svl-trainer
sudo cp -rv dist /var/www/svl-trainer

# デーモンの起動。/etc/systemd/system/svl-trainer.serviceを配置しておく。
echo "■■■■■ サーバ ■■■■■"
sudo systemctl restart svl-trainer
systemctl status svl-trainer --no-pager

echo "■■■■■ デプロイ完了！ ■■■■■"
