import { useEffect } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { useDispatch, useSelector } from 'react-redux';
import { filtersFetched, filtersChoosed } from '../../actions'
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {

    const { filters, activeFilter } = useSelector(state => state)
    const dispatch = useDispatch()
    const { request } = useHttp()

    useEffect(() => {
        request('http://localhost:3001/filters')
            .then(data => dispatch(filtersFetched(data)))
            .catch(err => console.log(err))
    }, [])

    const onFiltred = (activeFilter) => {
        dispatch(filtersChoosed(activeFilter))
    }


    console.log(activeFilter)
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {filters.map(item => <button onClick={() => onFiltred(item.value)} key={item.value} className={`btn ${item.className} ${item.value === activeFilter ? 'active' : ''}`}>{item.label}</button>)}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;