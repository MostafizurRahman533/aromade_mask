//==============================
//	【OR／AND混合　絞り込みフィルタ】
//	■イメージ
//		OR = a,b,c
//		AND = x,y,z
//		OR(AND) = a+b+c(xyz) = axyz,bxyz,cxyz

// data-orcategory="or1"
//
//	■仕様
//==============================

$(function () {
	//絞り込み項目（選択群）に関すること
	let wrapSelecter = {
		class: '._filter_select',	//選択群を指定
		checked: 0,	//選択群、全体における[input:checked]の数を格納
	};
	//選択カテゴリーに関すること
	let selectorCategory = {
		class: '._filter_select_item',	//各選択カテゴリーを指定（[data-type]を同位置に設置）
	};
	//結果表示群に関すること
	let wrapResult = {
		class: '._filter_result', //結果表示群を指定
		resultTagClass: '._filter_result_box', //タグクラスをつける場所を指定
		resultShowClass: 'box_show', //表示するクラス（display:block）
		noInputResult: '.noResult' //ヒットが無いときに表示するタグクラス
	}

	//タグ記憶処理
	let key = {
		orArry1: [], //OR記憶
		orArry2: [],
		orArry3: [],
		orChecked: 0, //OR処理内でチェックされている数
		andClickArry: [], //AND記憶
		andChecked: 0, //AND処理内でチェックされている数

		//チェックされていたら記憶、はずれていたら削除
		checkedKeyArry: function (arryName, clickName) {
			if ($('#' + clickName).is(':checked')) {
				arryName.push('.' + clickName);
				arryName = arryName.filter(function (x, num, self) {
					return self.indexOf(x) === num;
				});
				//console.log(clickName + 'を格納');
			}
			else if ($('#' + clickName).not(':checked')) {
				//console.log(clickName + 'を削除');
				arryName = arryName.filter(function (name) {
					return name !== '.' + clickName;
				});
			}
			return arryName;
		},
	}

	let andJoinClass = ''; //andのclickされたid名(表示するクラス名)を格納
	let showClass1; //結果表示群に表示するクラス名を格納
	let showClass2;

	//すでにinput:checkedのものを表示にする
	if ($(wrapSelecter.class).find('input[type="checkbox"]:checked').length !== 0) {
		let firstChecked = $(selectorCategory.class + ' ' + 'input[type="checkbox"]:checked');
		//console.log(firstChecked);
		check(firstChecked);
	}

	//チェックボックスがクリックされたときの処理
	$(selectorCategory.class + ' ' + 'input[type="checkbox"]').click(function () {
		//console.log($(this).attr('id'));

		//console.log(this);
		//$(wrapResult.resultTagClass).removeClass(wrapResult.resultShowClass).animate({opacity:'0',display:'none'},200);
		$(wrapResult.resultTagClass).removeClass(wrapResult.resultShowClass);

		check(this);

	});//click


	//	関数
	//	絞り込みタイプの取得 →チェックつける／はずすごとのタグクラスを記録 →タグクラスの表示

	function check(obj) {

		let selecterType = $(obj).parents(selectorCategory.class).data('type'); //処理タイプの取得
		let orCategory = $(obj).parents(selectorCategory.class).data('orcategory');

		if (selecterType == 'or') {
			//console.log('or hello');
			let orClickName = $(obj).attr('id');
			key.orChecked = $(obj).parents(selectorCategory.class).find('input[type="checkbox"]:checked');

			if (orCategory == 'or1') {
				key.orArry1 = key.checkedKeyArry(key.orArry1, orClickName);
			}
			else if (orCategory == 'or2') {
				key.orArry2 = key.checkedKeyArry(key.orArry2, orClickName);
			}
			else if (orCategory == 'or3') {
				key.orArry3 = key.checkedKeyArry(key.orArry3, orClickName);
			}
			console.log(key.orArry1);
			console.log(key.orArry2);
			console.log(key.orArry3);

		}//if or

		if (selecterType == 'and') {
			//console.log('and hello');
			let andClickName = $(obj).attr('id');
			key.andChecked = $(obj).parents(selectorCategory.class).find('input[type="checkbox"]:checked').length;

			key.andClickArry = key.checkedKeyArry(key.andClickArry, andClickName);

			andJoinClass = '';
			andJoinClass = key.andClickArry.join('');
		}//if and

		//表示
		wrapSelecter.checked = $(wrapSelecter.class).find('input[type="checkbox"]:checked').length;
		console.log('totalChecked:' + wrapSelecter.checked);
		let orCheckedNum = key.orArry1.length + key.orArry2.length+ key.orArry3.length;
		let orClickArry = [];
		let showClass = '';

			if(orCheckedNum>0){//OR選択されている

				if(key.orArry1.length!==0){//期間記入あり
					if(key.orArry2.length===0 && key.orArry3.length===0){
						for(let loop1=0;loop1<key.orArry1.length;loop1++){
							showClass=key.orArry1[loop1]+andJoinClass;
							console.log(showClass);
							$(wrapResult.class + ' ' + showClass).addClass(wrapResult.resultShowClass);
						}
					}
					else if(key.orArry2.length===0 && key.orArry3.length!==0){
						for(let loop1=0;loop1<key.orArry1.length;loop1++){
							for(let loop3=0;loop3<key.orArry3.length;loop3++){
								showClass=key.orArry1[loop1]+key.orArry3[loop3]+andJoinClass;
								console.log(showClass);
								$(wrapResult.class + ' ' + showClass).addClass(wrapResult.resultShowClass);
							}
						}
					}
					else if(key.orArry2.length!==0 && key.orArry3.length===0){
						for(let loop1=0;loop1<key.orArry1.length;loop1++){
							for(let loop2=0;loop2<key.orArry2.length;loop2++){
								showClass=key.orArry1[loop1]+key.orArry2[loop2]+andJoinClass;
								console.log(showClass);
								$(wrapResult.class + ' ' + showClass).addClass(wrapResult.resultShowClass);
							}
						}
					}
					else if(key.orArry2.length!==0 && key.orArry3.length!==0){
						for(let loop1=0;loop1<key.orArry1.length;loop1++){
							for(let loop2=0;loop2<key.orArry2.length;loop2++){
								for(let loop3=0;loop3<key.orArry3.length;loop3++){
									showClass=key.orArry1[loop1]+key.orArry2[loop2]+key.orArry3[loop3]+andJoinClass;
									console.log(showClass);
									$(wrapResult.class + ' ' + showClass).addClass(wrapResult.resultShowClass);
								}
							}
						}
					}
				}else{//期間記入なし
					console.log('期間なし');
					if(key.orArry2.length!==0 && key.orArry3.length===0){
						for(let loop2=0;loop2<key.orArry2.length;loop2++){
							showClass=key.orArry2[loop2]+andJoinClass;
							console.log(showClass);
							$(wrapResult.class + ' ' + showClass).addClass(wrapResult.resultShowClass);
						}
					}
					else if(key.orArry2.length!==0 && key.orArry3.length!==0){
						for(let loop2=0;loop2<key.orArry2.length;loop2++){
							for(let loop3=0;loop3<key.orArry3.length;loop3++){
								showClass=key.orArry2[loop2]+key.orArry3[loop3]+andJoinClass;
								console.log(showClass);
								$(wrapResult.class + ' ' + showClass).addClass(wrapResult.resultShowClass);
							}
						}
					}
					else if(key.orArry2.length===0 && key.orArry3.length!==0){
						for(let loop3=0;loop3<key.orArry3.length;loop3++){
							showClass=key.orArry3[loop3]+andJoinClass;
							console.log(showClass);
							$(wrapResult.class + ' ' + showClass).addClass(wrapResult.resultShowClass);
						}
					}
				}

			}
			else if(key.andClickArry!==0) {
				showClass = andJoinClass;
				console.log('andだけです： (' + showClass + ')');
				$(wrapResult.class + ' ' + showClass).addClass(wrapResult.resultShowClass);
			}


		if ($(wrapResult.class).find('.' + wrapResult.resultShowClass).length === 0) {
			if (wrapSelecter.checked == 0) {
				$(wrapResult.resultTagClass).not(wrapResult.noInputResult).addClass(wrapResult.resultShowClass);
				//$(wrapResult.resultTagClass).not(wrapResult.noInputResult).each(function (i, el) {
				//	$(this).addClass(wrapResult.resultShowClass).delay(i*100).animate({opacity:'1'},1000);
				//});

			}
			else {
				$(wrapResult.class + ' ' + wrapResult.noInputResult).addClass(wrapResult.resultShowClass);
				//$(wrapResult.class + ' ' + showClass).each(function (i, el) {
				//	$(wrapResult.class + ' ' + wrapResult.noInputResult).animate({opacity:'1'},1000);
				//});
			}
		}
	};

})
