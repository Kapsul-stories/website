# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

# Seed data pour les articles de test

# Création d'articles de test
articles_data = [
  {
    title: "Les 10 plus beaux sites historiques de Paris",
    content: "Paris regorge de trésors historiques qui racontent l'histoire de France à travers les siècles. De la majestueuse cathédrale Notre-Dame aux jardins du Luxembourg, en passant par le Sacré-Cœur de Montmartre, chaque monument a une histoire unique à raconter.\n\nGrâce à Kapsul, vous pouvez maintenant découvrir ces lieux d'une manière totalement nouvelle : en écoutant leurs histoires racontées par des experts passionnés. Chaque capsule audio vous transporte dans le temps et vous fait vivre l'histoire comme si vous y étiez.\n\nDans ce guide, nous vous présentons les 10 sites incontournables à visiter avec Kapsul pour une expérience immersive unique.",
    category: "Guides & itinéraires",
    published: true,
    published_at: 2.days.ago,
    author: "admin@kapsul.com"
  },
  {
    title: "Comment créer une capsule audio captivante",
    content: "Vous êtes passionné d'histoire, de culture ou simplement de votre ville ? Vous avez des histoires fascinantes à raconter ? La Creator Academy de Kapsul est là pour vous aider à créer des capsules audio professionnelles.\n\nVoici nos meilleurs conseils pour créer du contenu engageant :\n\n1. Choisissez un sujet qui vous passionne\n2. Faites des recherches approfondies\n3. Structurez votre récit de manière claire\n4. Utilisez un ton naturel et chaleureux\n5. Ajoutez des anecdotes personnelles\n\nAvec ces conseils, vous serez prêt à partager vos connaissances avec des milliers d'utilisateurs de Kapsul !",
    category: "Creator Academy",
    published: true,
    published_at: 5.days.ago,
    author: "admin@kapsul.com"
  },
  {
    title: "Kapsul lance sa nouvelle fonctionnalité de réalité augmentée",
    content: "Nous sommes ravis d'annoncer le lancement de notre nouvelle fonctionnalité de réalité augmentée ! Désormais, en pointant votre téléphone vers un monument, vous pourrez non seulement écouter son histoire, mais aussi voir des reconstitutions 3D de son apparence à différentes époques.\n\nCette innovation technologique représente une avancée majeure dans la manière dont nous vivons l'histoire et la culture. Imaginez voir la Tour Eiffel en construction ou le Colisée dans toute sa splendeur romaine !\n\nLa fonctionnalité sera déployée progressivement dans les principales villes européennes au cours des prochains mois.",
    category: "Actualités",
    published: true,
    published_at: 1.day.ago,
    author: "admin@kapsul.com"
  },
  {
    title: "Itinéraire culturel : Une journée dans le Marais",
    content: "Le Marais est l'un des quartiers les plus charmants de Paris, avec ses rues pavées, ses hôtels particuliers et ses nombreux musées. Voici un itinéraire d'une journée pour découvrir ce quartier historique avec Kapsul.\n\nMatin : Commencez par la Place des Vosges, la plus ancienne place de Paris. Écoutez l'histoire de Victor Hugo qui y a vécu.\n\nMidi : Déjeunez dans le quartier juif et découvrez l'histoire de cette communauté.\n\nAprès-midi : Visitez le Musée Picasso et le Musée Carnavalet.\n\nSoir : Terminez par une promenade le long de la Seine.\n\nChaque étape de cet itinéraire est enrichie de capsules audio exclusives créées par des historiens locaux.",
    category: "Guides & itinéraires",
    published: true,
    published_at: 4.days.ago,
    author: "admin@kapsul.com"
  },
  {
    title: "Les secrets d'une bonne narration audio",
    content: "La narration audio est un art qui demande de la pratique et de la technique. Dans cet article, nous partageons les secrets des meilleurs créateurs de Kapsul.\n\nLe rythme : Variez votre débit de parole pour maintenir l'attention.\n\nLa voix : Travaillez votre articulation et votre timbre.\n\nLe silence : N'ayez pas peur des pauses, elles donnent du relief à votre récit.\n\nL'émotion : Laissez transparaître votre passion dans votre voix.\n\nLa préparation : Répétez plusieurs fois avant d'enregistrer.\n\nRejoignez notre prochaine session de formation en ligne pour perfectionner vos compétences !",
    category: "Creator Academy",
    published: true,
    published_at: 3.days.ago,
    author: "admin@kapsul.com"
  }
]

puts "🌱 Création des articles de test..."

articles_data.each do |article_data|
  article = Article.find_or_create_by(title: article_data[:title]) do |a|
    a.content = article_data[:content]
    a.category = article_data[:category]
    a.published = article_data[:published]
    a.published_at = article_data[:published_at]
    a.author = article_data[:author]
  end
  
  if article.persisted?
    puts "✅ Article créé : #{article.title}"
  else
    puts "❌ Erreur : #{article.errors.full_messages}"
  end
end

puts "✨ Seed terminé !"
puts "📊 Total d'articles : #{Article.count}"
puts "📝 Articles publiés : #{Article.published.count}"

