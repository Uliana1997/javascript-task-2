'use strict';

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
exports.isStar = false;

/**
 * Телефонная книга
 */
var phoneBook = [];
// 'Алексей;5551110011;alex@example.com',
exports.add = function (phone, name, email) {
    for (var i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i].p.indexOf(phone) !== -1) {
            return false;
        }
    }
    if (check(phone, name)) {
        var em = {
            n: name,
            p: phone,
            e: email
        };
        phoneBook.push(em);

        return true;
    }

    return false;
};

function check(phone, name) {
    if ((phone.length === 10) && (typeof(name) !== 'undefined') &&
      (typeof(phone) !== 'undefined')) {

        return true;
    }
}

exports.update = function (phone, name, email) {
    var flag = false;
    for (var i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i].p.indexOf(phone) !== -1) {
            phoneBook[i].n = name;
            phoneBook[i].e = email;

            flag = true;
        }
    }

    return flag;
};

exports.findAndRemove = function (query) {
    var res = exports.find(query);
    var new_ = split_(query);
    var resa = slice_(query, new_);
    var newest = [];
    for (var j = 0; j < new_.length; j++) {
        newest = remove_(query, res[j], resa);
    }

    return newest.length;
};

function remove_(query, element, array) {
    var res = exports.find(query);
    for (var m = 0; m < array.length; m++) {
        if (element.indexOf(array[m]) !== -1) {
            res.splice(element, 1);
        }
    }

    return res;
}

function split_(query) {
    var res = exports.find(query);
    var new_ = [];
    if (res.length >= 1) {
        for (var i = 0; i < res.length; i++) {
            new_.push(res[i].split(','));
        }
    }

    return new_;
}

function slice_(query, array) {
    var resa = [];
    for (var j = 0; j < array.length; j++) {
        if (String(array[j]).replace(/D/g, '') > 2) {
            resa[j].push(array[j].trim().slice(1));
        }
    }

    return resa;
}
// 'Алексей;5551110011;alex@example.com',
// 'Валерий;5553330033;valera@example.com',
exports.find = function (query) {
    var res = [];
    if (query === '*') {
        res = zv();
    } else {
        res = is(query);
    }

    return res.sort();
};

function zv() {
    var res = [];
    for (var j = 0; j < phoneBook.length; j++) {
        var l = phoneBook[j].p;
        var k = '+7 (' + l.slice(0, 3) + ') ' + l.slice(3, 6) + '-' +
        l.slice(6, 8) + '-' + l.slice(-2);
        if (under(phoneBook[j].e) === '') {
            res.push(phoneBook[j].n + ', ' + k);
        } else {
            res.push((phoneBook[j].n + ', ' + k + ', ' + under(phoneBook[j].e)));
        }
    }

    return res;
}

function is(query) {
    var res = [];
    for (var i = 0; i < phoneBook.length; i++) {
        checker(phoneBook[i], query, res);
    }

    return res;
}

function checker(element, query, array) {
    if ((element.p.indexOf(query) !== -1) || (element.n.indexOf(query) !== -1) ||
        (under(element.e).indexOf(query) !== -1)) {
        var t = '+7 (' + element.p.slice(0, 3) + ') ' + element.p.slice(3, 6) +
        '-' + element.p.slice(6, 8) + '-' + element.p.slice(-2);
        if (under(element.e) === '') {
            array.push(element.n + ', ' + t);
        } else {
            array.push(element.n + ', ' + t + ', ' + under(element.e));
        }
    }
}

function under(email) {
    if (typeof(email) === 'undefined') {
        email = '';
    }


    return email;
}

exports.importFromCsv = function (csv) {
    // Парсим csv
    // Добавляем в телефонную книгу
    // Либо обновляем, если запись с таким телефоном уже существует
    // var new_ = [];
    // var newest = [];
    // for (i = 0; i < csv.length, i++) {
    //    new_.push(csv[i].split('\n'));
    // }
    // for (j = 0; j < new_.length, j++) {
    //    newest.push(new_[i].split(';'));
    //    if ((newest[i] === 10) {
    //        exports.add(newest[i], newest[i-1], newest[i+1];
    //        exports.update(newest[i], newest[i-1], newest[i+1];
    //    }
    // }
    return csv.split('\n').length;
};
