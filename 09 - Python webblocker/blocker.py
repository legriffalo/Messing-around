# simple website blocker

import time
from datetime import datetime as dt
import os


temp_path = r'./hosts'
hosts_path = r'C:\Windows\System32\drivers\etc\hosts'
redirect = '127.0.0.1'
website_list = ['www.facebook.com','www.youtube.com','youtube.com','facebook.com']


print(dt.now().hour)

while True:
    if dt(dt.now().year,dt.now().month,dt.now().day,8,59) < dt.now() < dt(dt.now().year,dt.now().month,dt.now().day,17,0):
        #print('work hours')
        with open(hosts_path,'r+') as file:
            content = file.read()
            #print(content)
            for website in website_list:
                if website in content:
                    pass
                else:
                    file.write(f'{redirect} {website} \n')

    else:
        with open(hosts_path,'r+') as file:
            content = file.readlines()
            file.seek(0)
            for line in content:
                if not any(website in line for website in website_list):
                    file.write(line)
            file.truncate()
            content = file.read()
            #print(content)
        print('fun time')

    #with open(temp_path,'r+') as file:
    #        content = file.read()
    #        print(content)
    
    time.sleep(5)
    
