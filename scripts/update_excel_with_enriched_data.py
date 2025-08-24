#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import pandas as pd
import os

def update_mathematiques_6eme_excel():
    """Met à jour le fichier Excel avec les données enrichies"""
    
    # Données enrichies correspondant à coursData.js
    data_enriched = [
        # Nombres & calculs
        {
            "Matiere": "Mathématiques",
            "Niveau": "6ème",
            "Chapitre": "1.1",
            "Competence": "Nombres entiers naturels",
            "Description": "Les nombres entiers sont les nombres positifs et sans virgule (0,1,2,3,...). Ils servent à compter et à ordonner des collections d'objets. L'ensemble des nombres entiers naturels est noté N.",
            "Exemple": "Exemples : 0,1,5,12,247,1000.",
            "Video_YouTube": "s_LDca9LEJE",
            "Site": "https://www.mathenpoche.net/6eme/pages/numerique/chap1/serie1/cours.html",
            "Thematique": "Nombres & calculs"
        },
        {
            "Matiere": "Mathématiques",
            "Niveau": "6ème",
            "Chapitre": "1.2",
            "Competence": "Nombres décimaux",
            "Description": "Un nombre décimal a une virgule qui sépare la partie entière de la partie décimale. Il peut être écrit comme une fraction dont le dénominateur est une puissance de 10.",
            "Exemple": "Exemples : 3,5 (ou 3,50), 12,75, −0,25, 45,8.",
            "Video_YouTube": "Ryy9nmQxeY0",
            "Site": "https://fr.khanacademy.org/math/arithmetic/arith-decimals",
            "Thematique": "Nombres & calculs"
        },
        {
            "Matiere": "Mathématiques",
            "Niveau": "6ème",
            "Chapitre": "1.3",
            "Competence": "Les fractions simples",
            "Description": "Une fraction représente une partie d'un tout. Elle s'écrit sous la forme a/b où le numérateur (a) est le nombre de parts et le dénominateur (b) est le nombre total de parts égales.",
            "Exemple": "Exemples : 1/2 (un demi), 1/4 (un quart), 3/4 (trois quarts).",
            "Video_YouTube": "ZJNFwVSJWxg",
            "Site": "https://www.lumni.fr/dossier/les-fractions",
            "Thematique": "Nombres & calculs"
        },
        {
            "Matiere": "Mathématiques",
            "Niveau": "6ème",
            "Chapitre": "2.1",
            "Competence": "Addition et soustraction",
            "Description": "L'addition (+) permet de réunir des quantités. La soustraction (−) permet d'en retirer une. Ce sont des opérations réciproques.",
            "Exemple": "Exemples : 5+3=8, 15−7=8.",
            "Video_YouTube": "s_LDca9LEJE",
            "Site": "https://www.mathenpoche.net/6eme/pages/numerique/chap2/serie1/cours.html",
            "Thematique": "Nombres & calculs"
        },
        {
            "Matiere": "Mathématiques",
            "Niveau": "6ème",
            "Chapitre": "2.2",
            "Competence": "Multiplication",
            "Description": "La multiplication (×) permet de calculer rapidement l'addition répétée d'un même nombre. C'est l'opération inverse de la division.",
            "Exemple": "Exemples : 4×3=12, 7×5=35.",
            "Video_YouTube": "Ryy9nmQxeY0",
            "Site": "https://fr.khanacademy.org/math/arithmetic/arithmetic-mult-div",
            "Thematique": "Nombres & calculs"
        },
        {
            "Matiere": "Mathématiques",
            "Niveau": "6ème",
            "Chapitre": "2.3",
            "Competence": "Division",
            "Description": "La division (÷ ou /) est l'opération de partage d'une quantité en parties égales ou de trouver combien de fois un nombre est contenu dans un autre.",
            "Exemple": "Exemples : 15÷3=5 (15 objets partagés en 3 donnent 5), 24÷6=4.",
            "Video_YouTube": "ZJNFwVSJWxg",
            "Site": "https://www.lumni.fr/video/la-division",
            "Thematique": "Nombres & calculs"
        },
        
        # Géométrie
        {
            "Matiere": "Mathématiques",
            "Niveau": "6ème",
            "Chapitre": "3.1",
            "Competence": "Les figures planes",
            "Description": "Les figures planes de base sont le triangle, le carré, le rectangle, le losange et le cercle. Chacune a des caractéristiques et des propriétés spécifiques.",
            "Exemple": "Exemples : Triangle (3 côtés), carré (4 côtés égaux), rectangle (4 angles droits), losange, cercle.",
            "Video_YouTube": "41Q2WT3wMy8",
            "Site": "https://www.mathenpoche.net/6eme/pages/geometrie/chap1/serie1/cours.html",
            "Thematique": "Géométrie"
        },
        {
            "Matiere": "Mathématiques",
            "Niveau": "6ème",
            "Chapitre": "3.2",
            "Competence": "Symétrie axiale",
            "Description": "La symétrie axiale transforme une figure en son image miroir par rapport à une ligne appelée axe de symétrie. Chaque point est à égale distance de l'axe.",
            "Exemple": "Exemple : Un A majuscule a un axe de symétrie vertical.",
            "Video_YouTube": "J0_lsJEq7SI",
            "Site": "https://www.geogebra.org/m/FhCqxRrR",
            "Thematique": "Géométrie"
        },
        {
            "Matiere": "Mathématiques",
            "Niveau": "6ème",
            "Chapitre": "3.3",
            "Competence": "Périmètre",
            "Description": "Le périmètre est la longueur du contour d'une figure plane. Il se calcule en additionnant la longueur de tous ses côtés.",
            "Exemple": "Exemples : Périmètre du carré = 4× côté, Périmètre du rectangle = 2× (longueur + largeur).",
            "Video_YouTube": "41Q2WT3wMy8",
            "Site": "https://www.mathenpoche.net/6eme/pages/geometrie/chap3/serie1/cours.html",
            "Thematique": "Géométrie"
        },
        {
            "Matiere": "Mathématiques",
            "Niveau": "6ème",
            "Chapitre": "3.4",
            "Competence": "Aires des figures",
            "Description": "L'aire est la mesure de la surface d'une figure plane. Elle s'exprime en unités carrées (ex: cm2,m2).",
            "Exemple": "Exemples : Aire du carré = côté × côté, Aire du rectangle = longueur × largeur.",
            "Video_YouTube": "J0_lsJEq7SI",
            "Site": "https://www.lumni.fr/video/calculer-laire-dun-rectangle",
            "Thematique": "Géométrie"
        },
        {
            "Matiere": "Mathématiques",
            "Niveau": "6ème",
            "Chapitre": "3.5",
            "Competence": "Constructions géométriques",
            "Description": "Les constructions géométriques utilisent la règle et le compas pour tracer des figures précises. Cela permet de développer le raisonnement spatial.",
            "Exemple": "Exemples : Tracer une droite parallèle, un triangle équilatéral, un cercle.",
            "Video_YouTube": "41Q2WT3wMy8",
            "Site": "https://www.geogebra.org/m/constructions-geometriques",
            "Thematique": "Géométrie"
        },
        
        # Grandeurs & mesures
        {
            "Matiere": "Mathématiques",
            "Niveau": "6ème",
            "Chapitre": "4.1",
            "Competence": "Les unités de longueur",
            "Description": "Les unités de longueur (mm, cm, dm, m, dam, hm, km) permettent de mesurer des distances. Chaque unité est 10 fois plus grande que la précédente.",
            "Exemple": "Exemple : 1 m=10 dm=100 cm=1000 mm.",
            "Video_YouTube": "PcuOgBEhKhw",
            "Site": "https://www.lumni.fr/video/les-unites-de-mesure-de-longueur",
            "Thematique": "Grandeurs & mesures"
        },
        {
            "Matiere": "Mathématiques",
            "Niveau": "6ème",
            "Chapitre": "4.2",
            "Competence": "Les unités de masse et capacité",
            "Description": "La masse mesure la quantité de matière (mg, g, kg, t). La capacité mesure le volume d'un liquide (ml, cl, dl, l).",
            "Exemple": "Exemples : 1 kg=1000 g, 1 l=100 cl=1000 ml.",
            "Video_YouTube": "PcuOgBEhKhw",
            "Site": "https://www.lumni.fr/video/les-unites-de-mesure-de-masse",
            "Thematique": "Grandeurs & mesures"
        },
        {
            "Matiere": "Mathématiques",
            "Niveau": "6ème",
            "Chapitre": "4.3",
            "Competence": "Les durées",
            "Description": "Les durées s'expriment en secondes, minutes, heures, jours, semaines, mois, années.",
            "Exemple": "Exemple : 1 h=60 min=3600 s, 1 jour=24 h.",
            "Video_YouTube": "PcuOgBEhKhw",
            "Site": "https://www.lumni.fr/video/les-unites-de-temps",
            "Thematique": "Grandeurs & mesures"
        },
        {
            "Matiere": "Mathématiques",
            "Niveau": "6ème",
            "Chapitre": "4.4",
            "Competence": "Proportionnalité simple",
            "Description": "La proportionnalité est la relation entre deux grandeurs où l'une est une multiple de l'autre. Le rapport entre les deux grandeurs est constant.",
            "Exemple": "Exemple : Si 2 kg coûtent 6€, alors 4 kg coûtent 12€ (le double).",
            "Video_YouTube": "PcuOgBEhKhw",
            "Site": "https://www.mathenpoche.net/6eme/pages/proportionnalite/cours.html",
            "Thematique": "Grandeurs & mesures"
        },
        
        # Organisation des données
        {
            "Matiere": "Mathématiques",
            "Niveau": "6ème",
            "Chapitre": "5.1",
            "Competence": "Lecture de tableaux",
            "Description": "Un tableau organise des données en lignes et en colonnes pour une lecture facile des informations.",
            "Exemple": "Exemple : Tableau des températures par jour, tableau des notes d'une classe.",
            "Video_YouTube": "9P0_hZJjXVY",
            "Site": "https://www.mathenpoche.net/6eme/pages/donneesStats/chap1/serie1/cours.html",
            "Thematique": "Organisation des données"
        },
        {
            "Matiere": "Mathématiques",
            "Niveau": "6ème",
            "Chapitre": "5.2",
            "Competence": "Graphiques",
            "Description": "Les graphiques (barres, secteurs) permettent de visualiser et de comparer des données pour mieux les comprendre.",
            "Exemple": "Exemples : Graphique en barres des sports préférés, diagramme circulaire des couleurs.",
            "Video_YouTube": "9P0_hZJjXVY",
            "Site": "https://www.lumni.fr/video/lire-un-graphique",
            "Thematique": "Organisation des données"
        },
        {
            "Matiere": "Mathématiques",
            "Niveau": "6ème",
            "Chapitre": "5.3",
            "Competence": "Moyennes",
            "Description": "La moyenne d'une série de nombres est leur somme divisée par le nombre de valeurs. Elle représente une valeur centrale de la série.",
            "Exemple": "Exemple : Moyenne de 12,15,10 et 12 est (12+15+10+12)/4 = 49/4 = 12,25.",
            "Video_YouTube": "9P0_hZJjXVY",
            "Site": "https://fr.khanacademy.org/math/statistics-probability/summarizing-quantitative-data",
            "Thematique": "Organisation des données"
        }
    ]
    
    # Chemin vers le fichier Excel
    excel_path = "../data/Mathematiques_6eme.xlsx"
    
    # Créer le DataFrame
    df = pd.DataFrame(data_enriched)
    
    # Ajouter des colonnes pour les quiz si elles n'existent pas
    if 'Quiz_Question' not in df.columns:
        df['Quiz_Question'] = ""
    if 'Quiz_Reponses' not in df.columns:
        df['Quiz_Reponses'] = ""
    if 'Quiz_Bonne_Reponse' not in df.columns:
        df['Quiz_Bonne_Reponse'] = ""
    
    # Sauvegarder le fichier Excel
    try:
        with pd.ExcelWriter(excel_path, engine='openpyxl') as writer:
            df.to_excel(writer, sheet_name='Competences', index=False)
        
        print(f"✅ Fichier Excel mis à jour avec succès : {excel_path}")
        print(f"📊 {len(data_enriched)} compétences ajoutées")
        print(f"📚 Thématiques : {df['Thematique'].nunique()} (Nombres & calculs, Géométrie, Grandeurs & mesures, Organisation des données)")
        print(f"📖 Chapitres : {df['Chapitre'].nunique()} (de 1.1 à 5.3)")
        
    except Exception as e:
        print(f"❌ Erreur lors de la mise à jour : {e}")

if __name__ == "__main__":
    print("🔄 Mise à jour du fichier Excel Mathématiques 6ème avec les données enrichies...")
    update_mathematiques_6eme_excel()
    print("✅ Processus terminé !")
