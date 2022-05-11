import { Select } from "./styled-components/exports";

function CategoriesSelect({ categories, onChange, value, width='auto' }) {
    return ( 
        <Select 
            width={width}
            style={{alignSelf: 'center'}} 
            placeholder="Categorie" 
            onChange={onChange}
            value={value}
            // defaultValue={value}
        >
            <option>Select a categorie</option>
            {categories && categories.map((categorie, index) => (
                <option
                    key={index}
                    value={categorie.id} 
                >
                    {categorie.name}
                </option>
            ))}
        </Select> 
    );
}

export default CategoriesSelect;