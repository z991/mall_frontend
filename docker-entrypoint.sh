#!/bin/sh
set -e
#
cd /opt/prod/www/mall_frontend

if [ -n "$MALL_FRONTEND_URL" ]; then
    sed -i "s@{{\s*MALL_FRONTEND_URL\s*}}@$MALL_FRONTEND_URL@g" static/js/*.js
    sed -i "s@{{\s*MALL_FRONTEND_URL\s*}}@$MALL_FRONTEND_URL@g" static/js/*.js.map
fi
if [ -n "$MALL_BACKEND_URL" ]; then
    sed -i "s@{{\s*MALL_BACKEND_URL\s*}}@$MALL_BACKEND_URL@g" /etc/nginx/conf.d/mall_nginx.conf
fi
###############
exec "$@"