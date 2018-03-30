export class Matrix {

    constructor(n_rows, n_cols) {
        this.n_rows = n_rows;
        this.n_cols = n_cols;
        this.data = Array(this.n_rows).fill().map(() => new Array(this.n_cols).fill(0));
    }

    clone() {

        let m_clone = new Matrix(this.n_rows, this.n_cols);
        for (let i = 0; i < this.n_rows; i++) {
            for (let j = 0; j < this.n_cols; j++) {
                m_clone.data[i][j] = this.data[i][j];
            }
        }
        return m_clone;
    }

    static from_array(arr) {
        return new Matrix(arr.length, 1).map((row, index) => arr[index]);
    }

    static sub(a, b) {
        if (a.n_rows !== b.n_rows || a.n_cols !== b.n_cols) {
            throw console.log('dimension mismatch!');
        }

        // Return a new Matrix a-b
        return new Matrix(a.n_rows, a.n_cols)
            .map((_, i, j) => a.data[i][j] - b.data[i][j]);
    }

    to_array() {
        let arr = [];
        for (let i = 0; i < this.n_rows; i++) {
            for (let j = 0; j < this.n_cols; j++) {
                arr.push(this.data[i][j]);
            }
        }
        return arr;
    }

    randomize() {
        return this.map(e => Math.random() * 2 - 1);
    }

    add(n) {
        if (n instanceof Matrix) {
            if (this.n_rows !== n.n_rows || this.n_cols !== n.n_cols) {
                throw console.log('Columns and Rows of A must match Columns and Rows of B.');
            }
            return this.map((e, i, j) => e + n.data[i][j]);
        } else {
            return this.map(e => e + n);
        }
    }

    static transpose(matrix) {
        return new Matrix(matrix.n_cols, matrix.n_rows)
            .map((_, i, j) => matrix.data[j][i]);
    }

    static multiply(a, b) {
        // Matrix product
        if (a.n_cols !== b.n_rows) {
            throw console.log('Columns of A must match n_rows of B.')
        }

        return new Matrix(a.n_rows, b.n_cols)
            .map((e, i, j) => {
                // Dot product of values in col
                let sum = 0;
                for (let k = 0; k < a.n_cols; k++) {
                    sum += a.data[i][k] * b.data[k][j];
                }
                return sum;
            });
    }

    multiply(n) {
        if (n instanceof Matrix) {
            if (this.n_rows !== n.n_rows || this.n_cols !== n.n_cols) {
                throw console.log('Columns and Rows of A must match Columns and Rows of B.');
            }

            // hadamard product
            return this.map((e, i, j) => e * n.data[i][j]);
        } else {
            // Scalar product
            return this.map(e => e * n);
        }
    }

    map(func) {
        // Apply a function to every element of matrix
        for (let i = 0; i < this.n_rows; i++) {
            for (let j = 0; j < this.n_cols; j++) {
                let val = this.data[i][j];
                this.data[i][j] = func(val, i, j);
            }
        }
        return this;
    }

    static map(matrix, func) {
        // Apply a function to every element of matrix
        return new Matrix(matrix.n_rows, matrix.n_cols)
            .map((e, i, j) => func(matrix.data[i][j], i, j));
    }

    print() {
        console.table(this.data);
        return this;
    }

    serialize() {
        return JSON.stringify(this);
    }

    static deserialize(data) {
        if (typeof data === 'string') {
            data = JSON.parse(data);
        }
        let matrix = new Matrix(data.n_rows, data.n_cols);
        matrix.data = data.data;
        return matrix;
    }
}