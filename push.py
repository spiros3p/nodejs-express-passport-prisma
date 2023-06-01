import os

x = input('Commit message: ')


os.system('npm run format:write')
# os.system('npm run lint:fix')

os.system('git add .')
os.system(f'git commit -m "{x}"')
os.system('git push')