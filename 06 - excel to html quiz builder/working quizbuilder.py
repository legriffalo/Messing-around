
import pandas as pd
import os
#import shutil
#import openpyxl
from datetime import datetime
import mdtex2html
import numpy as np

def quote_clean(x):
    x = x.replace("'","&#39")
    return x


# need to refactor in to function to add to main site
def write_html(path, name):
    with open(f"{path}/{name}.html") as quiz:
        quiz.write('''<!DOCTYPE html>
        <html>
        <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <script src="../dependencies/MathJax-2.7.3/MathJax.js">
        MathJax.Hub.Config({
        extensions: ["tex2jax.js"],
        jax: ["input/TeX","output/HTML-CSS"],
        tex2jax: {inlineMath: [["$","$"]]}
        });
        </script>''')
        quiz.write(f'''
        <title>{name}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes">
        <link rel="stylesheet" href="./dependencies/quiz_style.css">
        </head>
        <body>
        <div id="container">
        <div id="scorebox">
        score: <span id = "scorevalue">0</span> </div>
        <div id="correct"> Correct!</div>
        <div id="wrong"> Try again</div>
        <div id="question"> click start</div>
        <div id="instruction"> Click the correct answer</div>
        <div id="choices">
        </div>
        <div id="startreset" onclick="startQuiz()"> start/reset </div>
            
        <!--<div id="timeremaining"> Time:<span id="timeRemaining"></span> </div>-->
        <div id="quizover"> 
            <p> Well done </p>
            <p>Your score is <span id="quizscore"></span>/<span id = 'outof'></span></p></div>
            
            
            
        </div>

        <script type="text/javascript" src="./{name}2.js"></script>

        <script src ="./dependencies/quiz.js"></script>''')
        quiz.write('''
        <script type="text/javascript">
        function updateMathContent() {
            var math = MathJax.Hub.getAllJax("container");
            print(math)
            for(let i = 0; i<math.length;i++){
                var eq = math[i]
            MathJax.Hub.Queue(["Text", eq, ]);
        }}
        </script>

        
        </body>
        ''')
# need to refactor in to equation to add to main site
#def quiz_build(url,name,)
url = './quiz questions.xlsx'
options = pd.read_excel(url,'options')
options.set_index('Options', inplace = True)
qs = pd.read_excel(url,'questions')
print(qs.dtypes)
qs.head()
qs.fillna('na' ,inplace = True)
qs['incorrect'] = 'x'
#qs['index']='y'
qs.head()
print(qs.dtypes)
qs = qs.applymap(lambda x: str(x))
qs = qs.applymap(quote_clean)

qs['index2'] = range(1,len(qs)+1)
#qs.head()
qs.dtypes
qs['index2'] = qs['index2'].apply(lambda x: f'Q{x}')

qs.set_index('index2',inplace=True)
qs.head()

for index, row in qs.iterrows():
    incorrect=[]
    #incorrect = ['<p>' + x + '</p>' for x in row[2:-3] if x!='na']
    incorrect = ['<p>' + x + '</p>' for x in row[2:-3] if x!='na']
    #incorrect = [convert(x) for x in row[2:-3] if x!='na']
    row['incorrect'] = incorrect
    print(incorrect)
qs.head()

qs.drop(columns = ['incorrect1','incorrect2','incorrect3','incorrect4'], inplace = True)

# turn equations to text?
qs['Correctanswer'] = qs['Correctanswer'].apply(lambda x: f'<p> {x} </p>')



json = qs.to_json(orient="index")
json2 = options.to_json()

#print(json)
#with open(f"{name}2.js",'w') as e:
with open("quiz2.js",'w') as e:
    e.write('var questions = `')
    json = json.replace('$','&#36;')
    json = json.replace('\\\\','&#92;')
    #json = json.replace('$','\$')
    #json = json.replace('*','\\\times')
    e.write(f'{json}')
    e.write('`\n\n')
    e.write('var options = `')
    e.write(f'{json2}')
    e.write('`\n\n')