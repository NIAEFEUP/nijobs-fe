## Some notes on this Table abstraction implementation

There are 4 types of table components in order to allow you to use only the functionality you need on your table. Each *Table component is responsible for a specific feature, so you can compose them as you need. This is done by passing the child tables as `tableComponent` prop of the parent one. This will create a chain of Table implementations that do their specific task and end up rendering the `BaseTable`, that renders the processed rows. In order to have 3 functionalities at a same time (Sorting, Filtering, and Selection), you'll need a helper for the last 2, that will wrap and return a `FilterableTable` with a `tableComponent={SelectableTable}`, like it is done in the `ApplicationsReviewWidget`.

Each table file exports a Controlled version, which is the one you should use when passing that table as a `tableComponent` prop of another one, as the parent-most will handle the rows state for the others. The non-Controlled versions, simply wrap their respective implementations with a `MutableDataTable`, which creates the rows state and passes it down to the rest. 

tl;dr: Use the default export for the first table you are using, use the Controlled* version for the tables you pass as `tableComponent`.

Example of a table with 3 functionalities:

```js

    const ControlledSortableSelectableTable = (props) => (
        <ControlledSortableTable
            tableComponent={ControlledSelectableTable}
            {...props}
        />
    );

    ...

    <FilterableTable
        tableComponent={ControlledSortableSelectableTable}
        ...
    />

```