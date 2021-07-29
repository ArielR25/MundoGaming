import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17';
import App from './App';
import Landing from './components/landing/landing';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Form from './components/form/form';

configure({ adapter: new Adapter() });

describe('App', () => {
    let store
    const middlewares = []
    const mockStore = configureStore(middlewares);
  
    beforeEach(() => {
      store = mockStore([]);
    });

    describe('The component Landing Page should be render on the route /', () => {
        it('Debería renderizarse en la ruta "/"', () => {
            const wrapper = mount(
                <Provider store={store}>
                    <MemoryRouter initialEntries={['/']}>
                        <App />
                    </MemoryRouter>
                </Provider>
            );
            expect(wrapper.find(Landing)).toHaveLength(1);
        })
        it('THe component pokemons must be render on the route"/home/form")', () => {
            const wrapper = mount(
                <Provider store={store}>
                  <MemoryRouter initialEntries={[ '/home/form' ]}>
                    <App />
                  </MemoryRouter>
                </Provider>
            );
              expect(wrapper.find(Form)).toHaveLength(1);
          });
    })
})