# Pink invitation assets

Source: supplied JPEG, 2160×12960. Original preserved as reference-original.jpg.

Exact crop regions (x0,y0,x1,y1), with no generated modifications to the header or face photos:
- Header: (0,0,2160,1280).
- Middle: (0,1280,2160,11260).
- Footer: (0,11260,2160,12960).

Runtime JPEGs are resized to 1040px wide and optimized, stored under public/images/pink. Full-resolution crops remain here. The repeating middle has a 250px edge transition at runtime scale; top and footer do not repeat.

For mobile rendering, PaperBackground uses three exact consecutive slices of the optimized middle, resized to 640px wide (heights 1024, 1024, 909). Their combined size is 140,218 bytes. They repeat as a sequence and are positioned from the body's measured width and height, preserving the artwork when content grows. The original middle.jpg remains as a reference; it is no longer painted as a single background on the entire body. Header and footer remain independent.

Couple illustration was generated separately to match the pink watercolor/cupid/cat style. Original PNG retained as couple-original.png. The footer faces are from the supplied source and have not been replaced with AI-generated faces.
