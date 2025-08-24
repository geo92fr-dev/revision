#!/usr/bin/env python3
"""
Script pour restaurer tous les fichiers Excel dans le dossier data
"""

import pandas as pd
from pathlib import Path

def create_excel_files():
    """Crée tous les fichiers Excel nécessaires"""
    
    data_dir = Path('data')
    data_dir.mkdir(exist_ok=True)
    
    # Structure de base pour toutes les matières et niveaux
    matieres = {
        'Mathematiques': {
            '3eme': ['Nombres et calculs', 'Géométrie', 'Fonctions', 'Statistiques'],
            '4eme': ['Nombres et calculs', 'Géométrie', 'Proportionnalité', 'Statistiques'],
            '5eme': ['Nombres et calculs', 'Géométrie', 'Proportionnalité', 'Statistiques'],
            '6eme': ['Nombres et calculs', 'Géométrie', 'Grandeurs et mesures', 'Organisation et gestion de données']
        },
        'Francais': {
            '3eme': ['Lecture', 'Expression écrite', 'Grammaire', 'Orthographe'],
            '4eme': ['Lecture', 'Expression écrite', 'Grammaire', 'Orthographe'],
            '5eme': ['Lecture', 'Expression écrite', 'Grammaire', 'Orthographe'],
            '6eme': ['Lecture', 'Expression écrite', 'Grammaire', 'Orthographe']
        },
        'Anglais': {
            '3eme': ['Grammaire', 'Vocabulaire', 'Expression orale', 'Compréhension'],
            '4eme': ['Grammaire', 'Vocabulaire', 'Expression orale', 'Compréhension'],
            '5eme': ['Grammaire', 'Vocabulaire', 'Expression orale', 'Compréhension'],
            '6eme': ['Grammaire', 'Vocabulaire', 'Expression orale', 'Compréhension']
        },
        'Sciences': {
            '3eme': ['Physique-Chimie', 'SVT', 'Technologie'],
            '4eme': ['Physique-Chimie', 'SVT', 'Technologie'],
            '5eme': ['Physique-Chimie', 'SVT', 'Technologie'],
            '6eme': ['Sciences et technologie']
        }
    }
    
    print("📚 Création des fichiers Excel...")
    
    for matiere, niveaux in matieres.items():
        for niveau, chapitres in niveaux.items():
            # Créer les données pour ce fichier
            data = []
            for i, chapitre in enumerate(chapitres, 1):
                data.append({
                    'ID': chapitre.lower().replace(' ', '-').replace('é', 'e').replace('è', 'e'),
                    'Titre': chapitre,
                    'Description': f'Contenu et exercices sur {chapitre.lower()}',
                    'Ordre': i,
                    'Quiz_Associe': chapitre.lower().replace(' ', '_').replace('é', 'e').replace('è', 'e')
                })
            
            # Créer le DataFrame
            df = pd.DataFrame(data)
            
            # Nom du fichier
            filename = f'{matiere}_{niveau}.xlsx'
            filepath = data_dir / filename
            
            # Sauvegarder
            df.to_excel(filepath, index=False)
            print(f"✅ {filename} créé ({len(data)} chapitres)")
    
    # Créer le template de recherche vidéos
    template_data = [
        {
            'Chapitre': 'Les nombres entiers naturels',
            'Mots_cles_recherche': 'nombres entiers 6ème mathématiques cours',
            'Lien_YouTube': '',
            'Duree_recommandee': '5-10 minutes',
            'Qualite_validee': '',
            'Notes': ''
        },
        {
            'Chapitre': 'Les nombres décimaux',
            'Mots_cles_recherche': 'nombres décimaux 6ème explication simple',
            'Lien_YouTube': '',
            'Duree_recommandee': '5-10 minutes',
            'Qualite_validee': '',
            'Notes': ''
        },
        {
            'Chapitre': 'Les fractions simples',
            'Mots_cles_recherche': 'fractions simples 6ème comprendre',
            'Lien_YouTube': '',
            'Duree_recommandee': '5-10 minutes',
            'Qualite_validee': '',
            'Notes': ''
        }
    ]
    
    template_df = pd.DataFrame(template_data)
    template_file = data_dir / 'Template_Recherche_Videos.xlsx'
    template_df.to_excel(template_file, index=False)
    print(f"✅ Template_Recherche_Videos.xlsx créé")
    
    print(f"\n🎉 Tous les fichiers Excel ont été créés dans le dossier 'data/'")

if __name__ == "__main__":
    create_excel_files()
