import pandas as pd
df = pd.read_excel('./data.xlsx')
print(df.head())

print(df['Category'].unique())