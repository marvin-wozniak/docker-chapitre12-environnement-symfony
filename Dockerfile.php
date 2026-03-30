FROM php:8.3-fpm
RUN mv "$PHP_INI_DIR/php.ini-development" "$PHP_INI_DIR/php.ini"
RUN docker-php-ext-install opcache

RUN curl -sS https://getcomposer.org/installer | php -- --filename=composer --install-dir=/usr/local/bin
RUN curl -sS https://get.symfony.com/cli/installer | bash
RUN mv /root/.symfony5/bin/symfony /usr/local/bin/symfony

RUN apt update && apt install -y zip git libicu-dev locales
RUN docker-php-ext-install pdo_mysql
RUN docker-php-ext-install intl 

RUN locale-gen fr_FR.UTF-8
WORKDIR /app
COPY ./composer.json composer.lock ./
RUN composer install --no-interaction --no-scripts --optimize-autoloader 
COPY . .
RUN symfony server:ca:install
CMD mkdir -p var/cache var/log && chmod -R 777 /app/var && symfony serve --no-tls --allow-all-ip
