
// @ts-ignore
module.exports = function() {
    function rangeDate(min:any,max:any) {
        // @ts-ignore
        var min = min,max = max,days = (new Date(max) - new Date(min))/1000/60/60/24,
            i = 0,
            len = Math.floor(days),
            dates = [];

        for(;i<len;i++){
            dates.push(format(new Date(min).getTime()+1000*60*60*24*i));
        }
        return  dates;
    }

    function format(date:number) {
        var dateString = new Date(date),
            month = (dateString.getMonth()+1)<10 ? '0'+(dateString.getMonth()+1): (dateString.getMonth()+1),
            day = dateString.getDate()<10 ? '0'+dateString.getDate() : dateString.getDate();
        return dateString.getFullYear()+'-'+month+'-'+day
    }

    return rangeDate;
};
