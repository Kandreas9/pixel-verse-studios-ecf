FROM php:8.4-fpm-alpine

# Install system dependencies
RUN apk add --no-cache \
    nodejs \
    npm \
    nginx \
    supervisor \
    curl \
    zip \
    unzip \
    git \
    libpng-dev \
    libjpeg-turbo-dev \
    libwebp-dev \
    icu-dev \
    oniguruma-dev \
    libzip-dev

# Install PHP extensions
RUN docker-php-ext-configure gd \
    --with-jpeg \
    --with-webp

RUN docker-php-ext-install \
    pdo \
    pdo_mysql \
    intl \
    mbstring \
    zip \
    opcache \
    exif \
    pcntl \
    bcmath \
    gd

RUN apk add --no-cache --virtual .build-deps \
    $PHPIZE_DEPS \
    openssl-dev \
    cyrus-sasl-dev

RUN pecl install mongodb \
    && docker-php-ext-enable mongodb

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy application files
COPY . .

# Install dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Set permissions
RUN chown -R www-data:www-data storage bootstrap/cache

RUN npm i

RUN npm run build

RUN rm -rf node_modules

RUN mkdir -p /var/www/html/public/images

RUN chown -R www-data:www-data /var/www/html/public/images

RUN chmod -R 775 /var/www/html/public/images

EXPOSE 9000
CMD ["php-fpm"]
