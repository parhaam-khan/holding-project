export const isEmpty = (value:any) =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

  export const thousandSeperator = (value:number,currency:string = 'toman') => {
    if(value){
      if(currency === 'rial'){
      let rialValue = value * 10;
      return rialValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }else{
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    }
  }

  export const separateToCardNumber = (value:any) => {
    if(value){
      return value.toString().replace(/\d{4}(?=.)/g, '$& ')
    }
  }

  export const copyToClipboardHandler = (text:any) => {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Content copied to clipboard');
      },() => {
        console.error('Failed to copy');
      });
}