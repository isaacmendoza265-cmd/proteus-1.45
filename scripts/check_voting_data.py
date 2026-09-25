with open('src/data/antioquiaData.ts', encoding='utf-8') as f:
    c = f.read()

idx = c.find('export const VOTING_DATA')
print(c[idx:idx+2500])
