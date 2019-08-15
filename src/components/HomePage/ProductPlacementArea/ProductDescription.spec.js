import ProductDescription from "./ProductDescription";

describe('<ProductDescription /> rendering', () => {
    
    it('should render a div with some text', () => {
        const mockedRefSetter = jest.fn();
        const wrapper = shallow(<ProductDescription setRef={mockedRefSetter}/>);
        expect(wrapper.find('div')).toHaveLength(1);
        expect(mockedRefSetter).toHaveBeenCalledTimes(1);
    });

});