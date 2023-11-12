# auto commit script
git add .

files=$(git diff --name-only --cached)

for file in $files
do
  read -p "Entrez le message de commit pour $file: " commit_message

  git commit -m "$commit_message" "$file"
done

git push origin main