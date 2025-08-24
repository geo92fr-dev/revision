#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import pandas as pd
import os

def verify_excel_content():
    """Vérifie le contenu du fichier Excel mis à jour"""
    
    excel_path = "data/Mathematiques_6eme.xlsx"
    
    try:
        # Lire le fichier Excel
        df = pd.read_excel(excel_path, sheet_name='Competences')
        
        print(f"📋 Contenu du fichier : {excel_path}")
        print(f"📊 Nombre total de lignes : {len(df)}")
        print(f"📚 Colonnes disponibles : {list(df.columns)}")
        print()
        
        # Grouper par thématique
        print("🎯 Répartition par thématique :")
        thematiques = df.groupby('Thematique').size()
        for theme, count in thematiques.items():
            print(f"   - {theme} : {count} chapitres")
        print()
        
        # Afficher quelques exemples
        print("📖 Premiers chapitres :")
        for i, row in df.head(5).iterrows():
            print(f"   {row['Chapitre']} - {row['Competence']}")
            print(f"      🎥 YouTube: {row['Video_YouTube']}")
            print(f"      🔗 Site: {row['Site']}")
            print()
        
        # Vérifier que tous les chapitres ont des données
        print("✅ Vérification de l'intégrité :")
        missing_desc = df[df['Description'].isna() | (df['Description'] == '')].shape[0]
        missing_example = df[df['Exemple'].isna() | (df['Exemple'] == '')].shape[0]
        missing_video = df[df['Video_YouTube'].isna() | (df['Video_YouTube'] == '')].shape[0]
        missing_site = df[df['Site'].isna() | (df['Site'] == '')].shape[0]
        
        print(f"   - Descriptions manquantes : {missing_desc}")
        print(f"   - Exemples manquants : {missing_example}")
        print(f"   - Vidéos manquantes : {missing_video}")
        print(f"   - Sites manquants : {missing_site}")
        
        if missing_desc == 0 and missing_example == 0:
            print("🎉 Toutes les données enrichies sont présentes !")
        
    except Exception as e:
        print(f"❌ Erreur lors de la lecture : {e}")

if __name__ == "__main__":
    verify_excel_content()
