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
  
  desc "Change an admin's password"
  task change_password: :environment do
    email = ENV['EMAIL'] || 'admin@kapsul.com'
    password = ENV['PASSWORD']

    unless password
      puts "❌ Merci de fournir un mot de passe : EMAIL=... PASSWORD=... bin/rails admin:change_password"
      exit 1
    end

    admin = Admin.find_by(email: email)

    unless admin
      puts "❌ Aucun admin trouvé avec l'email : #{email}"
      exit 1
    end

    if admin.update(password: password, password_confirmation: password)
      puts "✅ Mot de passe mis à jour pour #{email}"
    else
      puts "❌ Erreur :"
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
