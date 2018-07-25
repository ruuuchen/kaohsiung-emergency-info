var apiurl="https://work1999.kcg.gov.tw/open1999/ServiceRequestsQuery.asmx/ServiceRequestsQuery";

var cityinfos={
  data01: [{area: "楠梓區", centername: "楠梓區災害應變中心", tel: "(07)3517121"},{area: "左營區", centername: "左營區災害應變中心", tel: "(07)5885217"},{area: "鼓山區", centername: "鼓山區災害應變中心", tel: "(07)5313725"},{area: "三民區", centername: "三民區災害應變中心", tel: "(07)3229575"},{area: "鹽埕區", centername: "鹽埕區災害應變中心", tel: "(07)5513316*210"},{area: "前金區", centername: "前金區災害應變中心", tel: "(07)2416379"},{area: "新興區", centername: "新興區災害應變中心", tel: "(07)2386114、(07)2370411"},{area: "苓雅區", centername: "苓雅區災害應變中心", tel: "(07)3355159"},{area: "前鎮區", centername: "前鎮區災害應變中心", tel: "(07)8215170"},{area: "旗津區", centername: "旗津區災害應變中心", tel: "(07)5717463"},{area: "小港區", centername: "小港區災害應變中心", tel: "(07)8152141、(07)8410213"}],
  data02: [{area: "鳳山區", centername: "鳳山區災害應變中心", tel: "(07)7422111#101、(07)7902941"},{area: "大寮區", centername: "大寮區災害應變中心", tel: "(07)7860323 "},{area: "鳥松區", centername: "鳥松區災害應變中心", tel: "(07)7314191"},{area: "林園區", centername: "林園區災害應變中心", tel: "(07)6412511、(07)6413025"},{area: "仁武區", centername: "仁武區災害應變中心", tel: "(07)3727900、(07)3719159"},{area: "大樹區", centername: "大樹區災害應變中心", tel: "(07)6512003"},{area: "大社區", centername: "大社區災害應變中心", tel: "(07)3513309#113"}],
  data03: [{area: "岡山區", centername: "岡山區災害應變中心", tel: "(07)6226848"},{area: "路竹區", centername: "路竹區災害應變中心", tel: "(07)6979219"},{area: "橋頭區", centername: "橋頭區災害應變中心", tel: "(07)6110246"},{area: "梓官區", centername: "梓官區災害應變中心", tel: "(07)6174111、(07)6105174"},{area: "彌陀區", centername: "彌陀區災害應變中心", tel: "(07)6191216"},{area: "永安區", centername: "永安區災害應變中心", tel: "(07)6912716"},{area: "燕巢區", centername: "燕巢區災害應變中心", tel: "(07)6161411"},{area: "田寮區", centername: "田寮區災害應變中心", tel: "(07)6361233"},{area: "阿蓮區", centername: "阿蓮區災害應變中心", tel: "(07)6311396、(07)6316261、(07)6311177"},{area: "茄萣區", centername: "茄萣區災害應變中心", tel: "(07)6906233"},{area: "湖內區", centername: "湖內區災害應變中心", tel: "(07)6995406"}],
  data04: [{area: "旗山區", centername: "旗山區災害應變中心", tel: "(07)6616100"},{area: "美濃區", centername: "美濃區災害應變中心", tel: "(07)6816694"},{area: "內門區", centername: "內門區災害應變中心", tel: "(07)6671211"},{area: "杉林區", centername: "杉林區災害應變中心", tel: "(07)6771340"},{area: "甲仙區", centername: "甲仙區災害應變中心", tel: "(07)6753893"},{area: "六龜區", centername: "六龜區災害應變中心", tel: "(07)6892100"},{area: "茂林區", centername: "茂林區災害應變中心", tel: "(07)6801045"},{area: "桃源區", centername: "桃源區災害應變中心", tel: "(07)6861132"},{area: "那瑪夏區", centername: "那瑪夏區災害應變中心", tel: "(07)6701395"}]
};

var vm1=new Vue({
  el: "#contact_area",
  data: {
    items01: cityinfos.data01,
    items02: cityinfos.data02,
    items03: cityinfos.data03,
    items04: cityinfos.data04,
  }
});

$(window).scroll(function(e){
  if ($(window).scrollTop()<=0){
    $(".navbar").removeClass("navscroll");
    $("#cover").removeClass("coverscroll");
  }
  else{
    $(".navbar").addClass("navscroll");
    $("#cover").addClass("coverscroll");
  }
});


$(document).ready(function(){
  $("#jsdata").on("change", function(){
    $("#map_area").show();
    $("#info_area").show();
    $("#contact_area").show();
    $("#js-tbody").html("");
    $("a.block").show();

    // 接資料
    $.ajax({
      url: apiurl,
      success: function(res){
        var obj=JSON.parse(res);
        // 宣告基礎變數
        var map;
        var marker=[];
        var infowindow = new google.maps.InfoWindow();
        // 依資料設定地圖
        for(i=0;i<obj.length;i=i+1){
          if($("#jsdata").val()==obj[i].ZipName_){
            var location= new google.maps.LatLng(obj[i].Lat_, obj[i].Lng_);
            var myoptions={
              zoom: 14,
              center: location
            };
          }
          else if($("#jsdata").val()=="全區"){
            var location= new google.maps.LatLng(obj[i].Lat_, obj[i].Lng_);
            var myoptions={
              zoom: 10,
              center: location
            };
          }
        }
        // 創造地圖
        map = new google.maps.Map($("#map")[0], myoptions);
          for(i=0;i<obj.length;i=i+1){
            var time=obj[i].Cre_Date_;
            var area=obj[i].ZipName_;
            var address=obj[i].address_;
            var name=obj[i].InformDesc_;
            var description=obj[i].BeforeDesc_;
            var department=obj[i].UnitName_;
            var status=obj[i].StatusName_;
            var onclickjs="showInfo(map, marker["+i+"])";
            var result="<div class='card'><div class='card-body'><span class='badge badge-secondary badge-warning'>"+status+"</span><span class='badge badge-light'>"+name+"</span><hr/><span class='badge badge-primary'>"+area+"</span><h5 class='card-title'>"+address+"</h5><p class='card-text'>"+description+"</p></div><div class='card-footer'><small class='text-muted'>反應日期："+time+"</small><br/><small class='text-muted'>承辦機關："+department+"</small></div>";
            var allresult="請選擇單一行政區以查看詳情。"

            // 區域選擇後資料生成
            if($("#jsdata").val()==area){
              $("#js-tbody").append(result);
              // 創造地圖標記
              marker[i]=new google.maps.Marker({
                position: new google.maps.LatLng(obj[i].Lat_, obj[i].Lng_),
                map: map,
                title: name, address
              });
              google.maps.event.addListener(marker[i], "click", function(){
                showInfo(map, this);
              });
            }
            else if($("#jsdata").val()=="全區"){
              $(".card-columns").text(allresult);
              marker[i]=new google.maps.Marker({
                position: new google.maps.LatLng(obj[i].Lat_, obj[i].Lng_),
                map: map,
                title: name, address
              });
              google.maps.event.addListener(marker[i], "click", function(){
                showInfo(map, this);
              });
            }

            // 資訊視窗
            showInfo=function(mapobj, markerobj){
              infowindow.setContent(infos(markerobj));
              infowindow.open(mapobj, markerobj);
            }
            // 資訊視窗內容
            var infos=function(markerobj){
              var html="<h6><strong>"+markerobj.title+"</strong></h6><p><strong>詳細位置：</strong>"+markerobj.address+"<p>";
              return html;
            }
          }
        }
    });
  });
});