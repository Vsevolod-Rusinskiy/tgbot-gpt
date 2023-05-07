# Основной образ
FROM node:19.5.0-alpine

# Создание рабочей директории
WORKDIR /app

# Копирование package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm ci

# Копирование исходного кода
COPY . .

ENV PORT=3000
# Устанавливаем переменные окружения
#ARG BOT_TOKEN
#ENV BOT_TOKEN=${BOT_TOKEN}

# Открытие порта (если нужно)
EXPOSE $PORT


# Запуск приложения
CMD ["npm", "start"]
