# seal-queensu.github.io

## Publication Update:
You can add your publication record in the file, `PublicationList.csv`, whose direction is `./publications/PublicationList.csv`. 

In `PublicationList.csv`, we have 13 columns. For each column, here are tips for update,

**A column (Title):** Input your title of your publication here. If you are one of the editors for a workshop, just leave it blank.

**B column (Authors) *Necessary*:** Input all the authors of your publication.

**C column (Venues) *Necessary*:** Please check `./publications/Venue.csv` if your publication's venues exist and has abbrs.

- Exist: Input the venues' abbrs in the (Venues) column.

- Not exist but have abbrs: Update the `Venue.csv` in `./publications`, and then input the abbrs in the (Venues) column.

- Not exist and no abbrs: Input 'Others' in the (Venues) column, and then input the whole venue name (as it appears on the paper) into K column (Venuenames).

- Theses: Input 'Others' in the (Venues) column, and then input the type of thesis (Master's or Ph.D.) into K column (Venuenames).

**D column (Years) *Necessary***: Input the accepted year of your publication (update it when published).

**E column (Types) *Necessary***: Input the types of your publication, including 'Journal Papers', 'Books or Book Chapters', 'Refereed Conference and Workshop Publications', 'Theses', 'Patents' or 'Invited Talks'.

**F column (Months)**: Input the accepted month of your publication (update it when published). If you do not have it, leave it blank.

**G column (Tracks)**: Input the track's name, symposium's name and other names under the Journals, Books or Conference. If you do not have it, leave it blank.

**H column (Editors & Pages)**: Input the editors' names, section numbers and page numbers. If you do not have it, leave it blank.

**I column (Publishers)**: Input the publisher's name. If you do not have it, leave it blank.

**J column (Awards)**: Input the awards this publication won. If you do not have it, leave it blank.

**K column (VenueNames)**: For publications, which do not exist in `Venue.csv` and have no abbrs, please input 'Others' in the (Venues) column, and then input the whole venue name (as it appears on the paper) into K column (Venuenames). If it is a thesis, please input the type of thesis (Master's or Ph.D.) into K column (Venuenames).
Otherwise, leave it blank.

**L column (PDFNames)**: Input your PDF filename here and put it under the `./publications/pdf` direction. The name we recommended is 'Abbr for Venue-First Name of First Author-Published Year' (do not input the type name .pdf here). If not leave it blank or the URL for the related website.

**M column (Sub-topics) *Necessary***: Input the sub-topics of your publication. 

**N column (Topics) *Necessary***: Input the Topics of your publication.

**O column (Topics)**: Input your PDF filename here (do not input the type name .pdf) and put it under the `./publications/presentation` direction. If not leave it blank or the URL for the related website.

## Venue Update:
You can add new venues with abbreviations in the file, `Venue.csv`, whose direction is `./publications/Venue.csv`. 

In `Venue.csv`, we have two columns, 'Abbr' and 'Name', here are tips for update,

**A column (Abbr) *Necessary*:** Input the abbreviation of a venue.

**B column (Name) *Necessary*:** Input the full name of a venue (as it appears on the paper).

## Venue Summary Update:
You can rank and merge different journals and conferences in `VenueSummary.csv`, whose direction is `./publications/VenueSummary.csv`.

In `VenueSummary.csv`, we have four columns, 'Abbr', 'Type', 'Summary' and 'Rank', here are tips for update,

**A column (Abbr) *Necessary*:** Input the abbreviation of a venue.

**B column (Type) *Necessary*:** Input the type of a venue. Options are 'Journal', 'Conference' and 'Others'.

**C column (Summary):** If this venue is from a journal or a conference, please input its current name for summary (e.g. For conferences like 'ICSM' and 'ICSME', they are the same conference but with different names. We input their current name 'ICSME' here).

**D column (Rank):** Input the rank of a venue (use an integer).

## Member Update:
You can add new members' infomation in the file, `memberInfo.csv`, whose direction is `./members/memberInfo.csv`.

In `memberInfo.csv`, we have 7 columns. For each column, here are tips for update,

**A column (Name) *Necessary*:** Input the member's name.

**B column (Description) *Necessary*:** Input the type of students or description of faculties. Options for students' types are 'Post Doctoral Fellow', 'Ph.D. Student', 'Master's Student', 'MEng Student', 'Research Associate', 'Undergraduate Student' and other names for undergraduate researchers.

**C column (Start Date) *Necessary*:** Input the start date for students in the lab (in `yyyy/mm` format).

**D column (End Date):** Input the leaving date for students (in `yyyy/mm` format). Leave it blank for current students.

**E column (Profile):** Input the URL for personal profiles. If you do not have it, leave it blank.

**F column (Email):** Input the email address for students. If you do not have it, leave it blank.

**G column (Comment):** Input other description for students, such as collaborator. If you do not have it, leave it blank.

**G column (Affiliation):** Input collaborators' affiliations. If you do not have it, leave it blank.

Then if you have the photo for students, please named it by his/her first Name and in jpeg format (e.g. `Justin.jpg`), and put it in the direction `./img/members/`.

## News Update:
You can update news in the file, `news.csv`, whose direction is `./news/news.csv`.

**A column (Date) *Necessary*:** Input the date of news, in (in `dd/mm/yyyy` format).

**B column (Content) *Necessary*:** Input the content of news.
