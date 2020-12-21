var solicitada = data[x][17]; //hora solicitada corregida.
      var llegada = data[x][25]; //hora de llegada a la obra.
      var salida = data[x][27]; // hora de salida de la obra.
      var estadia_esperada = 15 + data[x][12] * 6 + 10; //estadia esperada calculada en base al volumen pedido + los 15 minutos de posicionamiento y 10 min de lavado.

      if (solicitada !== null && llegada !== null && salida !== null){
        solicitada = parseInt(solicitada.substring(0,2)) * 3600 + parseInt(solicitada.substring(3,6)) * 60 + parseInt(solicitada.substring(7,8));
        llegada = parseInt(llegada.substring(0,2)) * 3600 + parseInt(llegada.substring(3,6)) * 60 + parseInt(llegada.substring(7,8));
        salida = parseInt(salida.substring(0,2)) * 3600 + parseInt(salida.substring(3,6)) * 60 + parseInt(salida.substring(7,8));

        var estadia_real = Math.ceil((salida - llegada) / 60);
                
        if (Math.abs(llegada - solicitada) > 1800) {
          atraso =  Math.abs((llegada - solicitada) - 1800 ) ; //1800 s = 30 minutos rango puntualidad
          atraso = Math.ceil(atraso / 60);
          puntual = "No";


        } else{
          atraso = 0;
          puntual = "Si";
        };

     if (estadia_real > estadia_esperada){
        min_adicionales = estadia_real - estadia_esperada;
        min_adicionales = Math.ceil(min_adicionales);
      }

      if (min_adicionales > atraso) {
        min_diferencia = min_adicionales - atraso;
        tramos = Math.floor(min_diferencia / 15);
        monto = tramos * 0.5;
      } else {
        min_diferencia = (atraso - min_adicionales);
        min_diferencia = min_diferencia + " Minutos a favor";
      }

      console.log(min_diferencia, tramos, monto);


      console.log(puntual, atraso); 