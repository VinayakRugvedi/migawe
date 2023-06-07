import {AiFillHeart} from 'react-icons/ai';

interface PropTypes {
    hitPoints: number;
    maxHitPoints: number;
    flip:boolean;
}
const HitPoints = ({ hitPoints, maxHitPoints,flip }:PropTypes) => {
    console.log('%c HitPoints', 'background: #222; color: #bada55',hitPoints);
    return (
        <div className="flex flex-row justify-end items-end p-4 gap-2">
            {Array(maxHitPoints).fill(0).map((_, i) => {
                let isHit = i < hitPoints as any;
                if(flip) isHit=((maxHitPoints-i-1)<hitPoints) as any ;
                return (
                    <label key={i} className={`swap swap-flip text-4xl pointer-events-none ${isHit?"swap-active":""}`}>
                        <div className="swap-on">
                            <AiFillHeart className="text-red-600"/>
                        </div>
                        <div className="swap-off">
                            <AiFillHeart className={`transition delay-300 ${isHit?"text-gray-200":"text-gray-600"}`}/>
                        </div>
                    
                    </label>
                )
            })}
        </div>
    );
}

export default HitPoints;
