cd /home/ubuntu/scheduler/vaultoniq_front_clock_app && \
sudo sed -i '1d' /home/ubuntu/scheduler/vaultoniq_front_clock_app/src/main.tsx && \
sudo sed -i -e 's/<React.StrictMode>//g' /home/ubuntu/scheduler/vaultoniq_front_clock_app/src/main.tsx && \
sudo sed -i -e 's/<\/React.StrictMode>//g' /home/ubuntu/scheduler/vaultoniq_front_clock_app/src/main.tsx && \
sudo npm install && \
sudo npm run build && \
sudo cp -r /home/ubuntu/scheduler/vaultoniq_front_clock_app/dist/* /var/www/clock-staging.vaultoniq.com/html/ && \
sudo rm -rf /home/ubuntu/scheduler/vaultoniq_front_clock_app/dist && \
sudo rm -rf /home/ubuntu/scheduler/vaultoniq_front_clock_app/node_modules && \
sudo systemctl restart nginx