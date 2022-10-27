import pandas as pd
import numpy as np
import re
#from nltk.corpus import stopwords
import fitz  # this is pymupdf
import os

#nltk.download('stopwords') #needed the first time
# list of english stop words to be filtered out (e.g. 'the', 'in', etc.)
#sw_nltk = stopwords.words('english')

# not needed function to calculate the relative term frequency
def weightage(word,text,number_of_documents=1):
    word_list = re.findall(r"\b" +word+r"\b" ,text)
    number_of_times_word_appeared =len(word_list)
    tf = number_of_times_word_appeared/float(len(text))
    idf = 0 #np.log((number_of_documents)/float(number_of_times_word_appeared))
    tf_idf = tf*idf
    return number_of_times_word_appeared 

# variables needed to build the pd.Series used to create the data frames at the end
count = 0
l_number_of_times_word_appeared = []
l_keywords = []
l_frequency = []
l_page = []
l_docName = []
l_docname_filtered = []

l_page_filtered = []
l_keywords_filtered = []

txt_all=""

# List of terms that are filtered out
daniel = ["automation","consulting","ai","artificial intelligence","machine learning","strategy"]
dominik = ["consulting", "governance", "steering", "project management", "program management", "PMO"]
words_of_interest = pd.Series(dominik)

# open PDF
path = "cvs"

for file in os.listdir(path):
    with fitz.open(path+"/"+file) as doc:
        #loop through all the pages of document
        count = 0
        for page in doc:

            text = ""
            text += page.get_text() #extract text from page

            txt_all += "***DOC "+re.findall(r'[^\/]+?pdf$',doc.name)[0]
            txt_all += "***PAGE "+ str(count) + " "

            txt_all += text #append page text to the overall text (used for debugging)

            count += 1 #used to label the page number

            # encode and make text lowercase to enable matching
            text = text.encode('ascii','ignore').lower()
            text_decoded = text.decode()

            #extract each term out of the text
            keywords = re.findall(r'[a-zA-Z]\w+',text_decoded)
            
            #Test to extract emails
            email = re.findall(r'([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})',text_decoded)
            if email: #if an email was found, add it to the keywords list
                keywords.insert(0,str(email[0][0])+"@"+str(email[0][1])+"."+str(email[0][2]))

            for word in words_of_interest:
                if re.findall(r" ", word):
                    if re.findall(r"\b" + re.escape(word) + r"\b", text_decoded):
                        matches = re.findall(r"\b" + re.escape(word) + r"\b", text_decoded)
                        print(matches)
                        for k in matches:
                            keywords.append(k)

            #print(keywords)
            #Create dataframe with the keaywords
            df = pd.DataFrame(list(set(keywords)),columns=['keywords'])
            #df = df[~df["keywords"].isin(sw_nltk)] # filter out stopper words to reduce the number of terms

            #Add the absolute frequency and the page number
            df['number_of_times_word_appeared'] = df['keywords'].apply(lambda x: weightage(x,text_decoded))
            df["page"] = str(count)
            df["docName"] = re.findall(r'[^\/]+?pdf$',doc.name)[0]

            #Extract the data into lists to create the overall extract
            l_number_of_times_word_appeared.extend(df['number_of_times_word_appeared'].tolist())
            l_keywords.extend(df['keywords'].tolist())
            l_page.extend(df['page'].tolist())
            l_docName.extend(df["docName"].tolist())

            #Create additional extract lists for the words of interest
            for word in words_of_interest:
                if re.search(r"\b" + re.escape(word) + r"\b", text_decoded):
                    l_page_filtered.append(str(count))
                    l_keywords_filtered.append(word)
                    l_docname_filtered.append(re.findall(r'[^\/]+?pdf$',doc.name)[0])

txt_all = txt_all.encode('ascii','ignore').lower()
text_all_decoded = txt_all.decode()
with open('text_all.txt', 'w') as f:
    f.write(text_all_decoded)

#Assemble lists to create the final data frame and save it as a csv
df_final = pd.DataFrame(list(zip(l_docName, l_page,l_keywords,l_number_of_times_word_appeared)), columns = ["docName","page_number","keywords","frequency_abs"])
#df_final.to_csv('out_put.csv', index=False)

#df_final.head() #display first 25 rows


#Assemble lists to create the final filtered data frame and save it as a csv
df_final_filtered = pd.DataFrame(list(zip(l_docname_filtered,l_page_filtered,l_keywords_filtered)), columns = ["docName","page_number","keywords"])
#df_final_filtered.to_csv('out_put_filtered.csv', index=False)
df_final_filtered.tail() #display first 25 rows



#Create Pivot Table with words of interest
df_final["page_number"].astype(int,copy=False)
df_final["keywords"].astype(str,copy=False)

#pivot = df_final[df_final["keywords"].isin(words_of_interest)].pivot_table(index=["docName","page_number"],columns="keywords",fill_value=0,sort=False,margins=[True,False],aggfunc="sum").iloc[:-1,:].sort_values(by=("frequency_abs","All"),ascending=False)
pivot = df_final[df_final["keywords"].isin(words_of_interest)].pivot_table(index=["docName"],columns="keywords",fill_value=0,sort=False,margins=[True,False],aggfunc="sum").iloc[:-1,:].sort_values(by=("frequency_abs","All"),ascending=False)


#Create Excel
from pandas import ExcelWriter
writer = ExcelWriter('cv_summary.xlsx')
#wb = writer.book
#worksheet = wb.create_sheet("Summary")
#writer.sheets[0] = worksheet
pivot.to_excel(writer,startrow=2,startcol=1,sheet_name = "Summary")

#worksheet = wb.create_sheet("Selected Keywords")
#writer.sheets[1] = worksheet
df_final_filtered.to_excel(writer,startrow=2,startcol=1,sheet_name = "Selected Keywords", index=False)

#worksheet = wb.create_sheet("All Words")
#writer.sheets[2] = worksheet
df_final.to_excel(writer,startrow=2,startcol=1,sheet_name = "All Words",index = False)


writer.close()
import os
os.startfile("cv_summary.xlsx")