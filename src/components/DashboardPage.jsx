import React from 'react';
import { connect } from 'react-redux';

import Base from './Base';
import ReporterCard from './ReporterCard';
import AnimationCon from './AnimationCon';

const reportersData = [
    {
        title: 'Recently Watched',
        reporters: [
            {
                name: 'Fausto Malave',
                timeLive: '12:32',
                viwers: 4242,
                img: 'https://media.licdn.com/dms/image/C5603AQGxflEWzJgMtA/profile-displayphoto-shrink_800_800/0?e=1547078400&v=beta&t=Olqux2iQO6jE7RMBQgdRf47r-ob6QQYR70G3TaihDJk',
                afiliated: [
                    {
                        link: 'Syfy',
                        image: 'https://i.imgur.com/5wrZAvP.png',
                    },
                    {
                        link: 'NBC',
                        image: 'https://i.imgur.com/L5oio8G.png',
                    },
                    {
                        link: 'Telemundo',
                        image: 'https://i.imgur.com/QNXWOdg.png',
                    }
                ]
            },
            {
                name: 'Marisset Verení',
                timeLive: '15:12',
                viwers: 4123,
                img: 'https://media.licdn.com/dms/image/C4D03AQFrYAiwDTTQfQ/profile-displayphoto-shrink_800_800/0?e=1547078400&v=beta&t=Qx9p4DOncQrU-V_Tj08cdG873Iypc0yFoJZUhaRd09U',
                afiliated: [
                    {
                        link: 'Syfy',
                        image: 'https://i.imgur.com/5wrZAvP.png',
                    },
                    {
                        link: 'NBC',
                        image: 'https://i.imgur.com/L5oio8G.png',
                    },
                    {
                        link: 'Telemundo',
                        image: 'https://i.imgur.com/QNXWOdg.png',
                    }
                ]
            },
             {
                name: 'Fausto Malave',
                timeLive: '12:32',
                viwers: 4242,
                img: 'https://media.licdn.com/dms/image/C5603AQGxflEWzJgMtA/profile-displayphoto-shrink_800_800/0?e=1547078400&v=beta&t=Olqux2iQO6jE7RMBQgdRf47r-ob6QQYR70G3TaihDJk',
                afiliated: [
                    {
                        link: 'Syfy',
                        image: 'https://i.imgur.com/5wrZAvP.png',
                    },
                    {
                        link: 'NBC',
                        image: 'https://i.imgur.com/L5oio8G.png',
                    },
                    {
                        link: 'Telemundo',
                        image: 'https://i.imgur.com/QNXWOdg.png',
                    }
                ]
            },
        ]
    },
    {
        title: 'Popular',
        reporters: [
            {
                name: 'Marisset Verení',
                timeLive: '15:12',
                viwers: 4123,
                img: 'https://media.licdn.com/dms/image/C4D03AQFrYAiwDTTQfQ/profile-displayphoto-shrink_800_800/0?e=1547078400&v=beta&t=Qx9p4DOncQrU-V_Tj08cdG873Iypc0yFoJZUhaRd09U',
                afiliated: [
                    {
                        link: 'Syfy',
                        image: 'https://i.imgur.com/5wrZAvP.png',
                    },
                    {
                        link: 'NBC',
                        image: 'https://i.imgur.com/L5oio8G.png',
                    },
                    {
                        link: 'Telemundo',
                        image: 'https://i.imgur.com/QNXWOdg.png',
                    }
                ]
            },
        ]
    },
    {
        title: 'Offline',
        reporters: [
            {
                name: 'Marisset Verení',
                timeLive: '15:12',
                viwers: 4123,
                img: 'https://media.licdn.com/dms/image/C4D03AQFrYAiwDTTQfQ/profile-displayphoto-shrink_800_800/0?e=1547078400&v=beta&t=Qx9p4DOncQrU-V_Tj08cdG873Iypc0yFoJZUhaRd09U',
                afiliated: [
                    {
                        link: 'Syfy',
                        image: 'https://i.imgur.com/5wrZAvP.png',
                    },
                    {
                        link: 'NBC',
                        image: 'https://i.imgur.com/L5oio8G.png',
                    },
                    {
                        link: 'Telemundo',
                        image: 'https://i.imgur.com/QNXWOdg.png',
                    }
                ]
            },
            {
                name: 'Fausto Malave',
                timeLive: '12:32',
                viwers: 4242,
                img: 'https://media.licdn.com/dms/image/C5603AQGxflEWzJgMtA/profile-displayphoto-shrink_800_800/0?e=1547078400&v=beta&t=Olqux2iQO6jE7RMBQgdRf47r-ob6QQYR70G3TaihDJk',
                afiliated: [
                    {
                        link: 'Syfy',
                        image: 'https://i.imgur.com/5wrZAvP.png',
                    },
                    {
                        link: 'NBC',
                        image: 'https://i.imgur.com/L5oio8G.png',
                    },
                    {
                        link: 'Telemundo',
                        image: 'https://i.imgur.com/QNXWOdg.png',
                    }
                ]
            },
        ]
    },
]

class DashboardPage extends Base {
    generateCards = (reporters) => {
        return reporters.map((d,i) => {
            return (
                <ReporterCard 
                    {...d} 
                    key={'card' + i} 
                />
            )
        })
    }
    generateColumns = () => {
        return reportersData.map((d, i) => {
            return (
                <AnimationCon
                    classNames='hold'
                    appear
                    in
                    timeout={{
                        enter: 2000 * (i + 1),
                        exit: 1000,
                    }}
                >
                    <div className='report-column'>
                        <p>{d.title}</p>
                        {this.generateCards(d.reporters)}
                    </div>
                </AnimationCon>
            )
        })
    }
    render() {
        return (
            <div className='DashboardPage'>
                <div className='reporters-container'>
                    {this.generateColumns()}
                </div>
              
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
