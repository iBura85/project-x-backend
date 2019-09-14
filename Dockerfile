FROM node:carbon

# Создать директорию app
RUN mkdir -p /app

WORKDIR /app


# Установить зависимости приложения
# Используется символ подстановки для копирования как package.json, так и package-lock.json,
# работает с npm@5+
COPY package*.json ./
RUN npm install
# Используется при сборке кода в продакшене
# RUN npm install --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]