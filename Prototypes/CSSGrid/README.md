# CSS Grid

## What i learned

- CSS Grid is a set of horizontal and vertical lines. When intersecting, rows and columns are created. Elements can be placed inside these rows and columns.

- CSS Grid and CSS Flex are complementary, the first is a two-dimensional layout model when the second is one-dimensional. By combining them, one can create very intricate layouts.

- Any element can become a grid by adding **display: grid** or **display: inline-grid**.

- Rows and columns can be defined (MDN speak of **grid definition**) through the **grid-template-rows** and **grid-template-columns** properties. Rows and columns create tracks.

- A **track** is the space between any two adjacent lines on the grid. Track patterns can be repeat through the **repeat() CSS function** to make more compact code.

- The **fr unit (stands for fraction)** is a length unit introduced in CSS Grid. It represents a fraction of the available space in a grid container.

- A grid can be **explicit** (rows and columns that are defined through **grid-template-rows** and **grid-template-columns**) but also **implicit** (rows and columns that are automatically created as a result of lack of space / elements being placed outside the define grid). These implicit rows and columns can be defined through the **grid-auto-rows** and **grid-auto-columns** properties.

- The **minmax() CSS function** is used with CSS Grid to clamp a value between a minimum inclusive and a maximum inclusive.

- Grid items can be positionned by targeting the lines around the tracks. One can do so by using the shorthand properties **grid-row** and **grid-column** which take value in this format: **start line** / **end line**.

- **Grid cells** are the smallest units in a grid. They are quite similar with **table cells**. When two or more cells are gathered, it is called a **grid area**. 

- **Gutters** are gaps between grid cells (they are accounted for before the **fr** unit space is calculated) that can be created through the **column-gap** and **row-gap** properties.

- A grid item can become a grid container itself. Then, by using the value **subgrid** on the **grid-template-rows** or **grid-template-columns** properties, one can use the grid definition of the parent instead of the child's one.

- **box-sizing** isn't an inherited property so use the **universal selector**to apply it to all elements. Also the value **border-box** has bad synergy with elements whose position property is set to **relative** or **absolute** as any change of padding / border sizes could potentially modify these elements position. In that particular case, it's better to use the value **content-box**.

- The pseudo-elements **::before** and **::after** can be used to pull really nice tricks like creating validation signs / logos for to-do list with just a few lines of CSS. For accessibility reasons, it is recommended to not use **before** to add content.
**::before** and **::after** seems widely used to add cosmetic content in UI.

- CSS Animation is used to animate a transition between a CSS style configuration and another configuration of that same CSS style.

- An animation sequence is created by using the **animation** property (or its sub-properties) on an element. **animation** is a shortcut for eight sub-properties.

- An animation appareance is defined using the at-rule **@keyframes**. Keyframes describe how the animation should render at any given time during the animation sequence. Keyframe use percentage to indicate at which stage of the animation it takes place. There exist aliases for 0% (**from**) and 100% (**to**).

- If a keyframe **doesn't specify its start/end animation's state** then browsers will use the element's actual style as start/end of the animation.

## Links

- [CSS - box-sizing | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing)
- [CSS - basic concepts of grid layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout)
- [CSS - Relationship of Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Relationship_of_Grid_Layout)