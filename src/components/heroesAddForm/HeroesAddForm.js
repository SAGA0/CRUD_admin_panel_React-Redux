import { useHttp } from '../../hooks/http.hook';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { editHero, heroesCreated } from '../heroesList/heroesSlice';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {

    const { editHeroId, heroes } = useSelector(state => state.heroes)
    const { filters } = useSelector(state => state.filters)

    const [heroName, setHeroName] = useState('')
    const [heroDescr, setHeroDescr] = useState('')
    const [heroElement, setHeroElement] = useState('')

    const dispatch = useDispatch();
    const { request } = useHttp();


    const onSubmit = (e) => {
        e.preventDefault()

        const newHeroes = {
            id: uuidv4(),
            name: heroName,
            description: heroDescr,
            element: heroElement
        }


        if (editHeroId) {
            const updatedHero = {
                ...newHeroes,
                id: editHeroId
            }
            request(`http://localhost:3001/heroes/${editHeroId}`, "PUT", JSON.stringify(updatedHero))
                .then(dispatch(editHero(updatedHero)))
                .catch(err => console.log(err))
        } else {
            request("http://localhost:3001/heroes", "POST", JSON.stringify(newHeroes))
                .then(dispatch(heroesCreated(newHeroes)))
                .catch(err => console.log(err))
        }




        setHeroName('');
        setHeroDescr('');
        setHeroElement('');
    }

    // const renderFilters = (filters) => {

    //     if (filters && filters.length > 0) {
    //         return filters.map(({ value, label }) => {
    //             // eslint-disable-next-line
    //             if (value === 'all') return;

    //             return <option key={value} value={value}>{label}</option>
    //         })
    //     }
    // }

    useEffect(() => {
        if (editHeroId) {
            const hero = heroes.find(item => item.id === editHeroId)
            setHeroName(hero.name)
            setHeroDescr(hero.description)
            setHeroElement(hero.element)
        }
        // eslint-disable-next-line
    }, [editHeroId])






    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input
                    required
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Как меня зовут?"
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text"
                    className="form-control"
                    id="text"
                    placeholder="Что я умею?"
                    style={{ "height": '130px' }}
                    value={heroDescr}
                    onChange={(e) => setHeroDescr(e.target.value)} />

            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select
                    required
                    className="form-select"
                    id="element"
                    name="element"
                    value={heroElement}
                    onChange={(e) => setHeroElement(e.target.value)}
                >
                    <option >Я владею элементом...</option>
                    {/* <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option> */}
                    {/* {renderFilters(filters)} */}
                    {filters.slice(1, filters.lenght).map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">{editHeroId ? 'Изменить' : 'Cоздать'}</button>
        </form>
    )
}

export default HeroesAddForm;