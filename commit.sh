git add .

# Obtenir la liste des fichiers modifiés
files=$(git diff --name-only --cached)

# Boucle sur chaque fichier modifié
for file in $files
do
  # Demander un message pour la commit
  read -p "Entrez le message de commit pour $file: " commit_message

  # Créer une commit avec le message spécifié
  git commit -m "$commit_message" "$file"
done

# Pousse les commits vers GitHub
git push origin main