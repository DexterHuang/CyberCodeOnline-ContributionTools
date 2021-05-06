The client app source is located in `/client` folder

all changes merged to master will be automatically deployed to production -> https://cco-contribution.netlify.app/

# Cyber Code Online Submission Automation Tool
We as the CCO Community are going to make an automation tool to help reduce the workload for our hardworking volunteer mods and making it easier for people to contribute content to CCO. By having a UI for submissions it makes it simple for people to submit new contributions and automatically format it. Automatic github integrations also make everyone's life easier.

- Should we add a music / art upload page? Can all go straight into a github folder for review.

## Stage 1: 
	- Simple PWA app that outputs final JSON on screen, allows user to copy and paste the edited json into the main repo manually
	- Dungeon design editor
		- Loads existing dungeon from contribution repo (GET request directly to GitHub raw file)
		- Editing existing existing design
		- Delete existing design
		- Addeding new design
		- Output json file ready to be copied and used fro pull request at contribution repo
	
## Stage 2: 
	- Github integration, user will be able to login with their github account, after editing, a PR will be automatically created with the user's account in the main repo

## Pending Tasks : 
	1. Main Menu
	2. Dungeon editor page
	3. Word editor for words
	4. Markdown view
	5. Grammar checker
	6. Pro Tips page
	7. Lore page
	8. Tutorials page
	9. Github login
	10. Github clone to local storage
	11. Github push / pr for dungeons
	12. Github push / pr for lore
	13. Github push / pr for words
	14. Github push / pr for tips
	15. Github push / pr for tutorials
	16. Github push/ pr for credits
	17. Generic File i/o module 
	18. Json parser and serializer 
	19. Dungeon path finding validation
## Page Structure / Content
### Main Menu
	1. First time user visits, prompt to enter nickname
	2. After nickname is entered, show agreement for user submission guidelines
	3. Save nickname somewhere in local storage so the user is not 
	   asked every time to enter username. 
	4. Show the main menu.
### Menu Contents
	1. Dungeons
	2. Words
	3. Lore
	4. Pro Tips
	5. Tutorials
	6. Change nickname?
### Dungeon 
	1. Has a dungeon editor
	2. Validate dungeon before submitting entry
	[Dungeon Editor]
	[Save Button]
	-----------------------------
	[Dungeon Submission Guidelines]
### Words
	1. Simple one line text field
	2. Drop down for word category
	3. Good to have : profanity filter to automatically deny bad words
	New Word : [Text field]
	[Save Button]
	-----------------------------
	[Words Submission Guidelines]
### Pro Tips
	1. Simple one line text field
	2. Good to have : profanity filter to automatically deny bad words
	New Pro Tip : [Text field]
	[Save Button]
	-----------------------------
	[Pro Tips Submission Guidelines]
### Tutorials
	1. Text area with markdown preview and short tutorial
	3. Good to have : grammar checking (js library maybe?)
	4. Good to have : profanity filter to automatically deny bad words
	New tutorial Entry : 
	[Text field]
	[Save Button]
	-----------------------------
	[Tutorial Submission Guidelines and Markdown cheat sheet]
### Lore
	1. Text area with markdown preview and short tutorial
	3. Good to have : grammar checking (js library maybe?)
	4. Good to have : profanity filter to automatically deny bad words
	New Lore Entry : 
	[Text field]
	[Save Button]
	-----------------------------
	[Lore Submission Guidelines and Markdown cheat sheet]
### Notes
	Maybe words and protips can be merged into one page, 
	and lore and tutorials in another since they both share the same rough
	format and interface. 

	Please do not try to reinvent the wheel, if there is a library that can do what we need, just import and use it.
	
	
