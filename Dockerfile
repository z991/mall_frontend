FROM reg.xiaoneng.cn/alpine/nginx:1.10
WORKDIR /src
RUN mkdir -p /opt/prod/www/mall_frontend
COPY dist /opt/prod/www/mall_frontend/
COPY mall_nginx.conf /etc/nginx/conf.d/
COPY docker-entrypoint.sh /opt/
RUN rm -rf /src
ENTRYPOINT ["/bin/sh","/opt/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
