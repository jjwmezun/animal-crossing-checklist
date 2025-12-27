interface CheckListProps {
	checked: object,
	generateOnCheck: ( index: number ) => () => void,
	list: object[];
}

interface CheckListRowProps {
	item: object;
	checked: boolean;
	generateOnCheck: () => void;
}

interface ColumnType {
	render: ( item: object ) => React.JSX.Element;
	title: string;
}

function generateCheckListType( type: string, columns: ColumnType[] ) {
	function CheckListRow( props: CheckListRowProps ): React.JSX.Element {
		const { item, checked, generateOnCheck } = props;
		const { name, order } = item as { name: string, order: number };

		return <tr>
			<td><input type="checkbox" checked={ checked } onChange={ generateOnCheck } /></td>
			<td>{ order }.</td>
			<td>{ name }</td>
			{ columns.map( ( column: ColumnType, index: number ) => <td key={ index }>
				{ column.render( item ) }
			</td> ) }
		</tr>;
	}

	return function CheckList( props: CheckListProps ): React.JSX.Element {
		const { checked, generateOnCheck, list } = props;

		return <div>
			<h2>{ toTitleCase( type ) }</h2>
			<table>
				<thead>
					<tr>
						<th>Check</th>
						<th>Order</th>
						<th>Name</th>
						{ columns.map( ( column: ColumnType, index: number ) => <th
							key={ index }
						>
							{ column.title }
						</th> ) }
					</tr>
				</thead>
				<tbody>
					{ list.map( ( item, index ) => <CheckListRow
						key={ index }
						item={ item }
						checked={ checked[ index ] }
						generateOnCheck={ generateOnCheck( index ) }
					/> ) }
				</tbody>
			</table>
		</div>;
	};
}

function toTitleCase( str: string ): string {
	return str.charAt( 0 ).toUpperCase() + str.slice( 1 ).toLowerCase();
}

export {
	generateCheckListType,
};

export type {
	CheckListProps,
	CheckListRowProps,
	ColumnType,
};
