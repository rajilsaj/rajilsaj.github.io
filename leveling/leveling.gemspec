# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "leveling"
  spec.version       = "0.1.0"
  spec.authors       = ["Vembe Sajila Rajil"]
  spec.email         = ["svembe@gmail.com"]

  spec.summary       = "A minimal and customizable Jekyll theme for blogs and portfolios."
  spec.description   = "Leveling is a clean and responsive Jekyll theme designed for personal websites, portfolios, and blogs. Built with simplicity and customization in mind."
  spec.homepage      = "https://github.com/rajilsaj/leveling"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_data|_layouts|_includes|_sass|LICENSE|README|_config\.yml)!i) }

  spec.add_runtime_dependency "jekyll", "~> 4.4"
end
