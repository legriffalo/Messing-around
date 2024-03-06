# simple hang man game
import random as r
import pandas as pd
# import urllib.request
import sys

###### screen stuff
def screener(x,y):
 screen =[]
 for i in range(0,x):
  screen.append([' ']*y)
 return screen

def show(screen,x):
 print(' ' + '_'*x)
 for row in screen:
  print('|',end='')
  for i in row:
   print(i,end='')
  print('|')
 print(' '+'_'*x)
   

def add(screen,el,pos):
 height = len(el)
 width = len(el[0])
 x=pos[0]
 y=pos[1]
	
 #print(height,width)
 for j in range(0,height):
  for i in range(0,width):
   screen[x+j][y+i]=el[j][i]
   
 #for row in el:
  #screen() 
  
  
  
###### screen stuff above

def select_word(words):
    rand = r.randint(0,len(words)-1)
    word = words[rand]
    word = list(word)
    return word

def set_up_slide(word):
    slide = ['***']*len(word)
    #print(slide)
    return slide
    
def clear(x):
    for i in range(1,x):
        #cursor up one line
        sys.stdout.write('\x1b[1A')
      #delete last line
        sys.stdout.write('\x1b[2K')

	
def check(guess,word,lives,slide,gamestate,guesses):
    clear(500)
    if list(guess) == word:
        slide = word
        gamestate = 'end'
        clear(500)
        print(slide)
        
        print('\nYou got it!')

        return slide,lives, gamestate

    
    # if a letter is correct
    
    
    if guess in word:
        for i in range(0,len(word)):
            if word[i] == guess:
                slide[i] = word[i]
        print(slide)
        
    else:
        add(screen,build_order[lives]['pic'],build_order[lives]['pos'])
        lives=lives + 1
        #print(f' lives remaining {lives}')
        gamestate = check_lives(lives,gamestate)
        print(slide)
        guesses.append(guess)
       
    print(f'incorrect guesses {guesses}')
    

    if slide == word:
        clear(500)
        print('you got all the letters. You got it!\n')
        print(slide)
        gamestate = 'end'
     
    print('\n\n')
    show(screen,20)
    print('\n\n')
    return slide,lives,gamestate



def check_lives(lives,gamestate):
    if lives >=11:
        #clear(50)
        #print(slide)
        #print(f'incorrect guesses {guesses}')
        #show(screen,20)
        print(f'\n unlucky the word was {word}\n\n**********************\n')
        gamestate = 'end'
    return gamestate
    
def menu_select(options,dialogue):
    selected = ''
    while selected.lower() not in options:
        selected = input(dialogue)
    return selected.lower()
    

def run_game(gamestate,slide,lives,guesses):
    while gamestate == 'end':
        start = menu_select(['y','n'], 'Do you want to start a game?')
        if start =='y':
            gamestate = 'playing'
            clear(500)
            guesses =[]
        else:
            gamestate = 'closed'
            print('game closed')
    while gamestate == 'playing':
        #print(gamestate)
        guess = input('input your letter or guess the word: ')
        if guess == 'STOP':
            print('over')
            gamestate = 'end'
            break
    
        else:
            slide,lives,gamestate = check(guess,word,lives,slide,gamestate,guesses)
    return gamestate

def set(words,lives,slide,screen):
    #print('made s')
    
    lives = 0
    #print('life reset')
    screen = screener(10,20)
    #print('made screen')
    word = select_word(words)
    slide = set_up_slide(word)
    return word,lives,slide,screen
 
 
 ###### graphics
       
base ={'pos':[9,0], 'pic': [[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ','#', '#', '#', '#', '#', '#','#', ' ', ' ', ' ']]}
vert ={'pic':[['#'], ['#'],['#'], ['#'],['#'], ['#'],['#'], ['#'], ['#']],'pos':[0,12]}
hor ={'pic':[['#', '#', '#', '#', '#', '#']],'pos':[0,6]}
corner ={'pic':[['\\']],'pos':[1,11]}
rope ={'pic':[['|'],['|']],'pos':[1,6]}
head ={'pic':[['#', '#', '#'],['#', '#', '#']],'pos':[3,5]}
body ={'pic':[['#'], ['#']],'pos':[5,6]}
lleg ={'pic':[['/']],'pos':[7,5]}
rleg={'pic':[['\\']],'pos':[7,7]}
larm={'pic':[['-','-']],'pos':[5,4]}
rarm={'pic':[['-','-']],'pos':[5,7]}

build_order=[base,vert,hor,corner,rope,head,body,lleg,rleg,larm,rarm]
 
#screen = screen(10,20)
 ###### starting variables
word_list = pd.read_csv('https://raw.githubusercontent.com/legriffalo/Messing-around/main/999%20words.txt',header =None)      
#print(word_list.head())
#print(word_list.columns)

# set green text in terminal 
g = '\u001b[32;1m'
print(g)
words = []
words =[ x for x in word_list[0]]
lives = ''
slide=''
guesses =[]
screen =[]
gamestate = 'end'
playing = False


#print(slide)
while gamestate!='closed':
    # function to to set up a round
    word,lives,slide,screen = set(words,lives,slide,screen)
    # function to run the game
    gamestate = run_game(gamestate,slide,lives,guesses)