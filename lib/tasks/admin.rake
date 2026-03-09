namespace :admin do
  desc "Create an admin user"
  task create: :environment do
    email = ENV['EMAIL'] || 'admin@kapsul.com'
    password = ENV['PASSWORD'] || 'password123'
    
    admin = Admin.find_or_create_by(email: email) do |a|
      a.password = password
      a.password_confirmation = password
    end
    
    if admin.persisted?
      puts "✅ Admin créé avec succès !"
      puts "Email: #{email}"
      puts "Mot de passe: #{password}"
    else
      puts "❌ Erreur lors de la création de l'admin :"
      puts admin.errors.full_messages
    end
  end
  
  desc "List all admins"
  task list: :environment do
    admins = Admin.all
    if admins.any?
      puts "Liste des admins :"
      admins.each do |admin|
        puts "- #{admin.email}"
      end
    else
      puts "Aucun admin trouvé."
    end
  end
end
