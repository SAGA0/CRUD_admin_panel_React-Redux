import { useHttp } from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectEditHero, fetchedHeroes, filteredHeroesSelector } from './heroesSlice';
import { deletedHeroes } from '../../actions'
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';


// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE



const HeroesList = () => {

    const { heroesLoadingStatus } = useSelector(state => state);
    const dispatch = useDispatch();
    const { request } = useHttp();
    const filteredHeroes = useSelector(filteredHeroesSelector)

    useEffect(() => {
        dispatch(fetchedHeroes(request));
        console.log('chang')
        // eslint-disable-next-line
    }, []);

    const onDeleteHero = useCallback((id) => {
        dispatch(deletedHeroes(request, id))
        console.log('delete', request)
        // eslint-disable-next-line
    }, [request])

    const onSelectEditHero = (id) => dispatch(selectEditHero(id))



    if (heroesLoadingStatus === "loading") {
        return <Spinner />;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }


    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }
        console.log(arr)
        return arr.map(({ id, ...props }) => {
            return (
                <HeroesListItem {...props} key={id} onSelectEditHero={() => onSelectEditHero(id)} onDeleteHero={() => onDeleteHero(id)} />)
        })


    }



    const elements = renderHeroesList(filteredHeroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;