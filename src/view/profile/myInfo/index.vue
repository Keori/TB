<template>
	<div>
		<Header :title="$t('my.personalms')"></Header>
		<div class="list">
			<Cell to='phone' :rightText="$t('my.nobind')">{{$t('my.bindphone')}}</Cell>
			<Cell to='Google'>{{$t('my.Googleverify')}}</Cell>
		</div>
		<div class="list">
			<Cell to='loginPwd'>{{$t('my.resetloginpwd')}}</Cell>
			<Cell to='payPwd'>{{$t('my.resetpaypwd')}}</Cell>
		</div>
	</div>
</template>

<script>
</script>

<style scoped="scoped" lang="less">
.list{
	padding-top: 0.19rem;
	background: #eee;
}
</style>